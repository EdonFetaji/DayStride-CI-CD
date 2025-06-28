from rest_framework import viewsets
from .models import Goal, UserGoal
from .serializers import GoalSerializer, UserGoalSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Goal
from .serializers import GoalSerializer


class GoalViewSet(viewsets.ModelViewSet):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.action == 'list':
            return Goal.objects.filter(is_public=True)
        return Goal.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'], url_path='my')
    def user_goals(self, request):
        goals = Goal.objects.filter(owner=request.user)
        serializer = self.get_serializer(goals, many=True)
        return Response(serializer.data)
