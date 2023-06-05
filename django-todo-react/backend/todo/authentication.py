from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout


class RegisterUser(APIView):

    def post(self, request):
        first_name = request.data.get('firstName')
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        is_user_present = get_user_model().objects.filter(username=username).exists()
        if is_user_present:
            return Response({'error_message': 'Username already taken. Please provide a different username.',
                             'error_code': 410},
                            status.HTTP_400_BAD_REQUEST)
        if len(username) > 125:
            return Response({'error_message': 'Username must be 125 characters or less.',
                             'error_code': 415},
                            status.HTTP_400_BAD_REQUEST)

        get_user_model().objects.create_user(username, email, password, first_name=first_name)
        return Response({'details': 'User successfully created'},
                            status.HTTP_200_OK)


class LoginUser(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error_message': 'Invalid credentials.',
                             'error_code': 420},
                            status.HTTP_400_BAD_REQUEST)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'username': user.username, 'token': token.key, 'user_id': str(user.id)}, status.HTTP_200_OK)


class LogoutUser(APIView):
    def get(self, request):
        logout(request)
        return Response('Success', status.HTTP_200_OK)


