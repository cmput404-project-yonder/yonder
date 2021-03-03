from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status, generics, validators
from rest_framework.authtoken.models import Token
from django.contrib.sites.shortcuts import get_current_site


from .models import Post, Author, Comment
from .serializers import *


class login(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        user = User.objects.select_related('author').get(username=username)

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'author': AuthorSerializer(user.author).data,
            'token': token.key
        })


class logout(generics.GenericAPIView):
    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class signup(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        author_data = {
            "displayName": request.data["displayName"], "github": request.data["github"]}
        user_serializer = self.get_serializer(data=request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        if "host" not in request.data:
            current_site = get_current_site(request=request)
            author_data["host"] = request.scheme + \
                "://" + current_site.name
        else:
            author_data["host"] = request.data["host"]
        author_data["user"] = user.id
        author_serializer = AuthorSerializer(data=author_data)
        if not author_serializer.is_valid():
            user.delete()
            raise validators.ValidationError(author_serializer.errors)

        author = author_serializer.save(user=user)
        author.url = author.host + "/author/" + str(author.id)
        author.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'author': AuthorSerializer(author).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST', 'DELETE'])
def author_detail(request):

    try:
        author = Author.objects.get(id=request.data["id"])
    except Author.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        author_serializer = AuthorSerializer(author)
        return Response({'author': author_serializer.data}, status=status.HTTP_200_OK)

    elif request.method == 'POST': 
        author_serializer = AuthorSerializer(author, data=request.data) 
        if author_serializer.is_valid(): 
            author_serializer.save() 
            return Response({'author': author_serializer.data}, status=status.HTTP_200_OK)
        return Response(author_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE': 
        author.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def post_detail(request):
    if request.method == 'GET':
        data = Post.objects.all()

        serializer = PostSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def comment_detail(request):
    if request.method == 'GET':
        data = Comment.objects.all()

        serializer = CommentSerializer(
            data, context={'request': request}, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
