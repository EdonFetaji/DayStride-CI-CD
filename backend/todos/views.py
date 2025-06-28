from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import TodoTask
from .serializers import TodoTaskSerializer

class TodoTaskViewSet(viewsets.ModelViewSet):
    serializer_class = TodoTaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TodoTask.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
