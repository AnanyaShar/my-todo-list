from rest_framework import serializers
from todo.models import TodoListItem, TodoList

class TodoListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoListItem
        exclude = ['updated_date']


class GetTodoListSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    todo_list_items = TodoListItemSerializer(many=True)

    class Meta:
        model = TodoList
        fields = '__all__'

class TodoListSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TodoList
        fields = '__all__'
