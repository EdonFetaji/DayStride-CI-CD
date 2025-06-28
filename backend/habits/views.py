from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Habit, HabitLog
from .serializers import HabitSerializer, HabitLogSerializer


class HabitViewSet(viewsets.ModelViewSet):
    serializer_class = HabitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        # kwargs['partial'] = True
        return super().update(request, *args, **kwargs)


class HabitLogViewSet(viewsets.ModelViewSet):
    serializer_class = HabitLogSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HabitLog.objects.filter(habit__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()
