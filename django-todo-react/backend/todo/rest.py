from todo.models import TodoList, TodoListItem
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from todo.serializers import TodoListSerializer, TodoListItemSerializer, GetTodoListSerializer

class TodoLists(ModelViewSet):

    serializer_class = TodoListSerializer
    queryset = TodoList.objects.all()

    def list(self, request):
        todo_list = TodoList.objects.prefetch_related('todo_list_items').filter(user=request.user)
        serializer = GetTodoListSerializer(todo_list, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if request.user != serializer.validated_data['user']:
            return Response({'error_message': 'Permission Denied'}, status.HTTP_403_FORBIDDEN)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({'todo_list': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, todo_list_id):
        try:
            todo_list = TodoList.objects.\
                get(id=todo_list_id, user=request.user)
        except TodoList.DoesNotExist:
            return Response({'error_message': 'Invalid ID'},
                            status.HTTP_403_FORBIDDEN)

        self.perform_destroy(todo_list)
        return Response(status=status.HTTP_204_NO_CONTENT)


class TodoListItems(ModelViewSet):
    serializer_class = TodoListItemSerializer
    queryset = TodoListItem.objects.all()

    def create(self, request, todo_list_id):
        try:
            todo_list = TodoList.objects.get(id=todo_list_id, user=request.user)
        except TodoList.DoesNotExist:
            return Response({'error_message': 'You are not authorize to perform this action'},
                            status.HTTP_403_FORBIDDEN)

        post_data = request.data
        todo_item_list = []
        for data in post_data:
            todo_item_list.append({
                'item_title': data.get('title'),
                'description': data.get('description'),
                'todo_list':  todo_list.id
            })

        serializer = self.get_serializer(data=todo_item_list, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, todo_list_item_id):
        try:
            todo_list_item = TodoListItem.objects.select_related('todo_list').\
                get(id=todo_list_item_id, todo_list__user=request.user)
        except TodoListItem.DoesNotExist:
            return Response({'error_message': 'Invalid ID'},
                            status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(todo_list_item, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    def destroy(self, request, todo_list_item_id):
        try:
            todo_list_item = TodoListItem.objects.select_related('todo_list').\
                get(id=todo_list_item_id, todo_list__user=request.user)
        except TodoListItem.DoesNotExist:
            return Response({'error_message': 'Invalid ID'},
                            status.HTTP_403_FORBIDDEN)

        self.perform_destroy(todo_list_item)
        return Response(status=status.HTTP_204_NO_CONTENT)




