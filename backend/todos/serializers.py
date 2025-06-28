from rest_framework import serializers
from .models import TodoTask


class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoTask
        fields = '__all__'
        read_only_fields = ['user']

    due_date = serializers.DateField(format="%Y-%m-%d", input_formats=["%Y-%m-%d"], required=False)
    due_time = serializers.TimeField(format="%H:%M:%S", input_formats=["%H:%M", "%H:%M:%S"], required=False)
