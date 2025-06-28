from django.db import models
from django.db import models
from django.contrib.auth.models import User

class Goal(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    end_date = models.DateField()
    location = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False)

class UserGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(auto_now_add=True)

