from django.template.context_processors import request
from rest_framework import viewsets, status
from .models import Goal, UserGoal
from .serializers import GoalSerializer, UserGoalSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Goal
from .serializers import GoalSerializer
from rest_framework.decorators import action


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action == 'list':
            joined_ids = UserGoal.objects.filter(user=self.request.user).values_list('goal_id', flat=True)

            return Goal.objects.filter(is_public=True).exclude(owner=self.request.user).exclude(id__in=joined_ids)

        return Goal.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'], url_path='my')
    def user_goals(self, request):
        goals = list(Goal.objects.filter(owner=request.user))
        goals += [x.goal for x in UserGoal.objects.filter(user=self.request.user)]

        serializer = self.get_serializer(goals, many=True, context={'request': request})

        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='join')
    def add_goal_to_user(self, request):
        goal_id = request.data.get('goal')

        if not goal_id:
            return Response({"detail": "Goal ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            goal = Goal.objects.get(id=goal_id)
        except Goal.DoesNotExist:
            return Response({"detail": "Goal not found."}, status=status.HTTP_404_NOT_FOUND)

        UserGoal.objects.create(goal=goal, user=request.user)

        return Response({"detail": "Goal successfully added to user."}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'], url_path='leave')
    def remove_user_goal(self, request):
        goal_id = request.data.get('goal')
        if not goal_id:
            return Response({"detail": "Goal ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            usr_goal = UserGoal.objects.get(user=self.request.user, goal_id=goal_id)
            usr_goal.delete()
        except Goal.DoesNotExist:
            return Response({"detail": "Goal not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response({"detail": "UserGoal successfully removed "}, status=status.HTTP_200_OK)
