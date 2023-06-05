from django.db import models
from django.conf import settings

# Create your models here.

class TodoList(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)

    class Meta:
        db_table = 'todo_list'


class TodoListItem(models.Model):
    item_title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    todo_list = models.ForeignKey(TodoList, on_delete=models.CASCADE, related_name='todo_list_items')
    created_date = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'todo_items'



