from django.urls import path, re_path

from todo import authentication, rest

urlpatterns = [
    path('auth/login/', authentication.LoginUser.as_view()),
    path('auth/register/', authentication.RegisterUser.as_view()),
    path('auth/logout/', authentication.LogoutUser.as_view()),
    path('todo-lists/', rest.TodoLists.as_view({'get': 'list'})),
    path('todo-lists/create/', rest.TodoLists.as_view({'post': 'create'})),
    path('todo-lists/<int:todo_list_id>/delete/', rest.TodoLists.as_view({'delete': 'destroy'})),
    path('todo-list-items/<int:todo_list_id>/', rest.TodoListItems.as_view({'post': 'create'})),
    path('todo-list-items/<int:todo_list_item_id>/change', rest.TodoListItems.as_view({'patch': 'update'})),
    path('todo-list-items/<int:todo_list_item_id>/delete', rest.TodoListItems.as_view({'delete': 'destroy'})),
]

