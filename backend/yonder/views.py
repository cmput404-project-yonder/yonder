import re
from django.contrib import auth
from rest_framework.response import Response
from rest_framework import mixins, status, generics, validators, viewsets
from rest_framework.authtoken.models import Token
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.serializers import Serializer
from drf_yasg.utils import swagger_auto_schema
from django.core.paginator import Paginator
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
import requests

from .models import Post, Author, Comment, RemoteNode, Like
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
                "://" + current_site.name + "/"
        else:
            author_data["host"] = request.data["host"]
        author_data["user"] = user.id
        author_serializer = AuthorSerializer(data=author_data)
        if not author_serializer.is_valid():
            user.delete()
            raise validators.ValidationError(author_serializer.errors)

        author = author_serializer.save(user=user)
        #author.save()

        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'user': UserSerializer(user).data,
            'author': AuthorSerializer(author).data,
            'token': token.key
        }, status=status.HTTP_201_CREATED)


class authors(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    @swagger_auto_schema(tags=['authors'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class remote_authors(generics.GenericAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def list(self, request):
        remote_nodes = RemoteNode.objects.all()
        authors = []
        for node in remote_nodes:
            url = node.host + "api/authors/"
            response = requests.get(url, auth=HTTPBasicAuth(node.ourUser, node.ourPassword))
            authors.append(response.json)

        if len(authors) > 0:
            return Response(authors, status=status.HTTP_200_OK)
        else:
            return Response(authors, status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(tags=['remote authors'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class author_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    @swagger_auto_schema(tags=['authors'])
    def get(self, request, *args, **kwargs):
        author = get_object_or_404(self.queryset, pk=kwargs["pk"])
        serializer = self.serializer_class(author)
        data = serializer.data
        data["url"] = author.get_absolute_url()
        return Response(serializer.data)

    @swagger_auto_schema(tags=['authors'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['authors'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class posts(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        post_data = request.data
        author = Author.objects.get(pk=kwargs["author_id"])
        post_data["source"] = author.host 
        post_data["origin"] = author.host
        serializer = self.get_serializer(data=post_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        author = self.kwargs["author_id"]
        return Post.objects.filter(author=author)

    @swagger_auto_schema(tags=['posts'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(tags=['posts'])
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class post_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

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
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(tags=['comments'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class comment_detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @swagger_auto_schema(tags=['comments'])
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['comments'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class author_followers(viewsets.ModelViewSet):
    queryset = AuthorFollower.objects.all()
    serializer_class = AuthorFollowerSerializer

    def list(self, request, author_id):
        author_followers = get_list_or_404(AuthorFollower, author=str(author_id))
        serializer = self.get_serializer(author_followers, many=True)
        follower_list = []
        for af in serializer.data:
            follower_list.append(af["follower"])

        return Response(follower_list, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=['followers'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class author_followers_detail(viewsets.ModelViewSet):
    queryset = AuthorFollower.objects.all()
    serializer_class = AuthorFollowerSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def check_following(self, author_id, follower_id):
        author_followers = AuthorFollower.objects.filter(author=author_id)
        for af in author_followers:
            if af.follower["id"] == str(follower_id):
                return True

        return False

    def create(self, request, author_id, follower_id):
        if self.check_following(author_id, follower_id):
            return Response("Already following", status=status.HTTP_409_CONFLICT)

        author_follower_data = {"author": author_id, "follower": request.data}
        serializer = self.get_serializer(data=author_follower_data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, author_id, follower_id):
        if self.check_following(author_id, follower_id):
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)

        # serializer = self.get_serializer(instance=author_follower)

        # return Response(serializer.data["follower"], status=status.HTTP_200_OK)

    def destroy(self, request, author_id, follower_id):
        author_follower = get_object_or_404(AuthorFollower, author=author_id, follower=request.data)
        author_follower.delete()

        return Response(status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=['followers'])
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    @swagger_auto_schema(tags=['followers'])
    def put(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    @swagger_auto_schema(tags=['followers'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class inbox(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['inbox'])
    def get(self, request, *args, **kwargs):
        # if not request.user.is_authenticated:
            # return Response(status=status.HTTP_401_UNAUTHORIZED)

        inbox = get_object_or_404(Inbox, author_id=kwargs["author_id"])
        author = get_object_or_404(Author, id=kwargs["author_id"])

        page_number = 1 if 'page' not in request.query_params else request.query_params.get('page')
        page_size = 5 if 'size' not in request.query_params else request.query_params.get('size')
        paginator = Paginator(inbox.items, page_size)
        page = paginator.page(page_number)
        
        data = {
            "type": "inbox",
            "author": author.get_absolute_url(),
            "items": page.object_list
        }

        return Response(data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(tags=['inbox'])
    def post(self, request, *args, **kwargs):
        inbox = get_object_or_404(Inbox, author_id=kwargs["author_id"])
        inbox.items.append(request.data)
        inbox.save()        
        
        if request.data["type"] == "Like":
            author = get_object_or_404(Author, id=kwargs["author_id"])
            formated_data = {
                "author": author.id,
                "object_url": request.data["object"]
            }
            like_serializer = LikeSerializer(data=formated_data)
            if like_serializer.is_valid():
                like_serializer.save()
            
        return Response(status=status.HTTP_201_CREATED)

    @swagger_auto_schema(tags=['inbox'])
    def delete(self, request, *args, **kwargs):
        inbox = get_object_or_404(Inbox, author_id=kwargs["author_id"])
        inbox.items.clear()
        inbox.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class post_likes(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['likes'])
    def get(self, request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs["post_id"])
        likes = Like.objects.all().filter(object_url=post.get_absolute_url()) 
        serialized_data = [LikeSerializer(like).data for like in likes]
        return Response(data=serialized_data, status=status.HTTP_200_OK)

class comment_likes(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['likes'])
    def get(self, request, *args, **kwargs):
        comment = get_object_or_404(Comment, id=kwargs["comment_id"])
        likes = Like.objects.all().filter(object_url=comment.get_absolute_url()) 
        serialized_data = [LikeSerializer(like).data for like in likes]
        return Response(data=serialized_data, status=status.HTTP_200_OK)

class likes(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['likes'])
    def get(self, request, *args, **kwargs):
        author = get_object_or_404(Author, id=kwargs["author_id"])
        likes = Like.objects.all().filter(author_id=author.id) 
        serialized_data = [LikeSerializer(like).data for like in likes]
        return Response(data=serialized_data, status=status.HTTP_200_OK)