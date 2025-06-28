from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HabitViewSet, HabitLogViewSet

router = DefaultRouter()

router.register('logs', HabitLogViewSet, basename='habit-log')
router.register('', HabitViewSet, basename='habit')

urlpatterns = router.urls
