from django.urls import path, include
from .views import RegisterView, DashboardView, CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path("current-user/", CurrentUserView.as_view(), name="current-user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('habits/', include('habits.urls')),
    path('goals/', include('goals.urls')),
    path('todos/', include('todos.urls')),
]
