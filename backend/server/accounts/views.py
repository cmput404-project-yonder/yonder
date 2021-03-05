import re
import json
from django.contrib import auth
from rest_framework.response import Response
from rest_framework import mixins, status, generics, validators
from rest_framework.authtoken.models import Token
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404
from rest_framework.serializers import Serializer
from drf_yasg.utils import swagger_auto_schema


from .models import Post, Author, Comment
from .serializers import *


class login(generics.GenericAPIView):
    serializer_class = LoginSerializer

    @swagger_auto_schema(tags=['authentication'])
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
    serializer_class = Serializer

    @swagger_auto_schema(tags=['authentication'])
    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class signup(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    @swagger_auto_schema(tags=['authentication'])
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
        author.save()

        inbox_serializer = InboxSerializer(data={"author": author.id})
        inbox_serializer.is_valid(raise_exception=True)
        inbox_serializer.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'author': AuthorSerializer(author).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)


class author_detail(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    @swagger_auto_schema(tags=['author'])
    def get(self, request, *args, **kwargs):
        author = get_object_or_404(self.queryset, pk=kwargs["pk"])
        serializer = self.serializer_class(author)
        return Response(serializer.data)

    @swagger_auto_schema(tags=['author'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['author'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class inbox(generics.ListCreateAPIView):

    @swagger_auto_schema(tags=['inbox'])
    def get(self, request, *args, **kwargs):
        # if not request.user.is_authenticated:
            # return Response(status=status.HTTP_401_UNAUTHORIZED)

        author = get_object_or_404(Author.objects.all(), id=kwargs["author_id"])
        inbox = get_object_or_404(Inbox.objects.all(), author_id=kwargs["author_id"])
        data = {"type": "inbox",
                "author": author.get_absolute_url()}
        data["items"] = []
        items = list(inbox.likes.all().values()) + list(inbox.posts.all().values()) #TODO: add folowers
        data["items"].append(items)
        return Response(data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(tags=['inbox'])
    def post(self, request, *args, **kwargs):
        inbox = get_object_or_404(Inbox.objects.all(), author_id=kwargs["author_id"])

        if request.data["type"] == "Like":
            serializer = LikeSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)        
            headers = self.get_success_headers(serializer.data)
            inbox.likes.add(get_object_or_404(Like.objects.all(), pk=serializer.data["id"]))
            inbox.save()            
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        if request.data["type"] == "Post":
            serializer = PostSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)        
            headers = self.get_success_headers(serializer.data)
            inbox.likes.add(get_object_or_404(Post.objects.all(), pk=serializer.data["id"]))
            inbox.save()            
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        # TODO: send follower request

    @swagger_auto_schema(tags=['inbox'])
    def delete(self, request, *args, **kwargs):
        inbox = get_object_or_404(Inbox.objects.all(), author_id=kwargs["author_id"])
        inbox.posts.clear()
        inbox.likes.clear()
        inbox.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class posts(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        post_data = request.data
        author = Author.objects.get(pk=post_data["author"])
        post_data._mutable = True
        post_data["source"] = author.host
        post_data["origin"] = author.host
        serializer = self.get_serializer(data=post_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @swagger_auto_schema(tags=['posts'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(tags=['posts'])
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class post_detail(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @swagger_auto_schema(tags=['posts'])
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=['posts'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['posts'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class comments(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @swagger_auto_schema(tags=['comments'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class comment_detail(mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    @swagger_auto_schema(tags=['comments'])
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
