from datetime import date

from rest_framework import serializers, generics

from goals.serializers import GoalSerializer
from habits.models import Habit, HabitLog
from habits.serializers import HabitSerializer
from todos.models import TodoTask
from goals.models import Goal, UserGoal
from todos.serializers import TodoTaskSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = date.today()

        habits = Habit.objects.filter(user=user)
        todos = TodoTask.objects.filter(user=user, due_date__gte=today)
        goals = list(Goal.objects.filter(owner=user, end_date__gte=today))
        goals += [x.goal for x in UserGoal.objects.filter(user=user) if x.goal.end_date >= today]

        return Response({
            "username": user.username,
            "email": user.email,
            "habits": HabitSerializer(habits, many=True).data,
            "todos": TodoTaskSerializer(todos, many=True).data,
            "goals": GoalSerializer(goals, many=True).data,
        })

# views.py

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name"]


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
