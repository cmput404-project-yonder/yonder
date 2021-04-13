import re
from rest_framework.response import Response
from rest_framework import status, generics, validators, viewsets
from rest_framework.authtoken.models import Token
from django.contrib.sites.shortcuts import get_current_site
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.serializers import Serializer
from drf_yasg.utils import swagger_auto_schema
from django.core.paginator import Paginator
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
import requests
import json

from .models import Post, Author, Comment, RemoteNode, Like
from .serializers import *
from .signals import check_remote_follow


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
            "displayName": request.data["displayName"], 
            "github": request.data["github"],
        }
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


class local_authors(generics.ListAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    @swagger_auto_schema(tags=['authors'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class local_remote_authors(generics.GenericAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

    def list(self, request):
        remote_nodes = RemoteNode.objects.all()
        authors = []
        for node in remote_nodes:
            url = node.host + "api/authors/"
            response = requests.get(url, auth=requests.models.HTTPBasicAuth(node.our_user, node.our_password))
            authors.extend(response.json())
        
        local_authors = self.get_queryset()
        for a in local_authors:
            local_authors_data = AuthorSerializer(instance=a).data;
            authors.append(local_authors_data)

        if len(authors) > 0:
            return Response(authors, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)

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
    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    @swagger_auto_schema(tags=['authors'])
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class public_posts(generics.ListAPIView):
    queryset = posts = Post.objects.filter(visibility='PUBLIC', unlisted=False)
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(tags=['public_posts'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

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
        
        try:
            post = Post.objects.get(id=kwargs["pk"])
            postJSON = PostSerializer(instance=post).data
            if post.visibility == "FRIENDS":
                req_user = get_object_or_404(User, username=request.user)
                requestor = get_object_or_404(Author, user=req_user)
                follows = AuthorFollower.objects.filter(author_id=post.author.id)
                for follow in follows:
                    if follow.follower["id"] == str(requestor.id):
                        _follows = AuthorFollower.objects.filter(author_id=requestor.id)
                        for _follow in _follows:
                            if _follow.follower["id"] == self.kwargs["author_id"]:
                                return Response(postJSON, status=status.HTTP_200_OK)
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            elif post.visibility == "PUBLIC":
                return Response(postJSON, status=status.HTTP_200_OK)

        except Post.DoesNotExist:
            # handle remote Posts
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + "api/author/" + kwargs["author_id"] + "/posts/" + kwargs["pk"] + "/"
                response = requests.get(
                    url,
                    auth=requests.models.HTTPBasicAuth(node.our_user, node.our_password)
                )
                if (response.status_code == 200):
                    return Response(response.json(), status=response.status_code)
                else:
                    return Response(response.content, response.status_code)

        return Response(status=status.HTTP_400_BAD_REQUEST)

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
        page_number = 1 if 'page' not in request.query_params else request.query_params.get('page')
        page_size = 5 if 'size' not in request.query_params else request.query_params.get('size')

        try:
            _ = Post.objects.get(id=kwargs["post_id"])
            comments = Comment.objects.filter(post_id=kwargs["post_id"]).order_by('-published')
            paginator = Paginator(comments, page_size)
            page = paginator.page(page_number)
            
            if page.object_list.count() == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)

            items = [self.serializer_class(comment).data for comment in page.object_list]
            data = {
                "type": "comments",
                "count": comments.count(),
                "items": items
            }

            return Response(data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            # handle remote post comments
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + "api/author/" + str(kwargs["author_id"]) + "/posts/" + str(kwargs["post_id"]) + "/comments/?" + str(page_number) + "&" + str(page_size)
                response = requests.get(
                    url,
                    auth=requests.models.HTTPBasicAuth(remote_node.our_user, remote_node.our_password),
                )
                if response.status_code == 200:
                    return Response(response.json(), status=response.status_code)
                if response.status_code == 204:
                    return Response(status=response.status_code)

        return Response(status=status.HTTP_400_BAD_REQUEST)


    @swagger_auto_schema(tags=['comments'])
    def post(self, request, *args, **kwargs):
        try:
            post = Post.objects.get(id=kwargs["post_id"])
            request.data['post'] = post.id
            comment_serializer = self.serializer_class(data=request.data)
            if comment_serializer.is_valid():
                comment_serializer.save()
                return Response(comment_serializer.data, status=status.HTTP_201_CREATED)
        except Post.DoesNotExist:
            # handle comment on a remote post
            host = request.data["post"]["author"]["host"]
            node = get_object_or_404(RemoteNode, host=host)
            url = node.host + "api/author/" + request.data["post"]["author"]["id"] + \
                "/posts/" + request.data["post"]["id"] + "/comments/"
            del request.data["post"]

            response = requests.post(url, 
                auth=requests.models.HTTPBasicAuth(node.our_user, node.our_password), 
                json=request.data,
                headers={"content-type": "application/json"}
            )
            return Response(response.content, status=response.status_code)


        return Response(status=status.HTTP_400_BAD_REQUEST)

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

    def check_following(self, author, follower_id):
        author_followers = AuthorFollower.objects.filter(author=author)
        for af in author_followers:
            if af.follower["id"] == str(follower_id):
                return Response(status=status.HTTP_200_OK)
        return False

    def create(self, request, author_id, follower_id):
        if author_id == follower_id:
            return Response("You can't follow yourself :/", status=status.HTTP_400_BAD_REQUEST)

        try:
            author = Author.objects.get(pk=author_id)
            if self.check_following(author, follower_id):
                return Response("Already following", status=status.HTTP_409_CONFLICT)
            author_follower_data = {"author": author_id, "follower": request.data["actor"]}
            serializer = self.get_serializer(data=author_follower_data)
            if not serializer.is_valid():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
        except Author.DoesNotExist:
            # handle remote author
            authorToFollow = request.data["object"]
            node = RemoteNode.objects.get(host=authorToFollow["host"])
            url = node.host + "api/author/" + str(authorToFollow["id"]) + "/followers/" + str(follower_id) + "/"
            response = requests.put(url, 
                auth=requests.models.HTTPBasicAuth(node.our_user, node.our_password), 
                json=request.data,
                headers={"content-type": "application/json"}
            )
            return Response(status=response.status_code)
        except RemoteNode.DoesNotExist:
            return Response("You are not allowed in the cool club", status=status.HTTP_401_UNAUTHORIZED)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, author_id, follower_id):
        try:
            author = Author.objects.get(pk=author_id)
            if self.check_following(author, follower_id):
                return Response(status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            # handle remote follower
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                theirFollower = {
                    "host": remote_node.host,
                    "id": author_id
                }
                ourAuthor = {
                    "id": follower_id
                }
                if check_remote_follow(theirFollower, ourAuthor):
                    return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, author_id, follower_id):
        try:
            author_follower = AuthorFollower.objects.get(author=author_id, follower__id=follower_id)
            author_follower.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except AuthorFollower.DoesNotExist:
            # handle remote follower
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + "api/author/" + author_id + "/followers/" + follower_id + "/"
                response = requests.delete(url,
                    auth=requests.models.HTTPBasicAuth(remote_node.our_user, remote_node.our_password),
                )
                return Response(status=response.status_code)

        return Response(status.HTTP_404_NOT_FOUND)

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
        inbox = get_object_or_404(Inbox, author_id=kwargs["author_id"])
        author = get_object_or_404(Author, id=kwargs["author_id"])

        data = {
            "type": "inbox",
            "author": author.get_absolute_url(),
            "items": inbox.items
        }

        return Response(data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(tags=['inbox'])
    def post(self, request, *args, **kwargs):
        originalPostHost = ""
        if "host" in request.data:
            originalPostHost = request.data["host"]
            del request.data["host"]
        try:
            # handle local author
            inbox = Inbox.objects.get(author_id=kwargs["author_id"])

            if request.data["type"] == "like":
                existing_like = Like.objects.all().filter(author__id=request.data["author"]["id"], object_url=request.data["object"])
                if len(existing_like) != 0:
                    return Response(status=status.HTTP_409_CONFLICT)    

                formated_data = {
                    "author": request.data["author"],
                    "object_url": request.data["object"]
                }
                like_serializer = LikeSerializer(data=formated_data)
                if like_serializer.is_valid():
                    like_serializer.save()

                inbox_data = {
                    "type": "like",
                    "author": request.data["author"],
                    "object": request.data["object"]
                }
                inbox.items.append(inbox_data)
                inbox.save()
            else:
                inbox.items.append(request.data)
                inbox.save()

            return Response(status=status.HTTP_201_CREATED)
        except Inbox.DoesNotExist:
            # Handle follower being on remote server
            remoteNode = get_object_or_404(RemoteNode,host=originalPostHost)
            url = originalPostHost + "api/author/" + kwargs["author_id"] + "/inbox/"
            response = requests.post(url, 
                json=request.data, 
                headers={"content-type": "application/json"}, 
                auth=requests.models.HTTPBasicAuth(remoteNode.our_user, remoteNode.our_password)
            )
            print(response.text)
            return Response(status=response.status_code)

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
        try:
            post = Post.objects.get(id=kwargs["post_id"])
            likes = Like.objects.filter(object_url=post.get_absolute_url()) 
            serialized_data = [LikeSerializer(like).data for like in likes]
            data = {
                "type": "likes",
                "items": serialized_data
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            # handle get likes for remote post 
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + request.path
                response = requests.get(
                    url,
                    auth=requests.models.HTTPBasicAuth(remote_node.our_user, remote_node.our_password),
                )
                if response == 200:
                    return Response(response.json(), status=response.status_code)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

class post_likes_count(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['likes'])
    def get(self, request, *args, **kwargs):
        try:
            post = Post.objects.get(id=kwargs["post_id"])
            likes_count = Like.objects.filter(object_url=post.get_absolute_url()).count()
            return Response(likes_count, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            # handle get likes for remote post 
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + request.path
                response = requests.get(
                    url,
                    auth=requests.models.HTTPBasicAuth(remote_node.our_user, remote_node.our_password),
                )
                if response == 200:
                    return Response(response.json(), status=response.status_code)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

class likes(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(tags=['likes'])
    def get(self, request, *args, **kwargs):
        try:
            author = Author.objects.get(id=kwargs["author_id"])
            likes = Like.objects.all().filter(author__id=str(author.id)) 
            serialized_likes = [LikeSerializer(like).data for like in likes]
            data = {
                "type": "liked",
                "items": serialized_likes
            }
            return Response(data=data, status=status.HTTP_200_OK)
        except Author.DoesNotExist:
            # handle get likes for remote post 
            remote_nodes = RemoteNode.objects.all()
            for remote_node in remote_nodes:
                node = RemoteNode.objects.get(host=remote_node.host)
                url = node.host + request.path
                response = requests.get(
                    url,
                    auth=requests.models.HTTPBasicAuth(remote_node.our_user, remote_node.our_password),
                )
                if response == 200:
                    return Response(response.json(), status=response.status_code)
        
        return Response(status=status.HTTP_404_NOT_FOUND)

class author_friends(generics.ListAPIView):
    serializer_class = AuthorFriendSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        author_followers = AuthorFriend.objects.filter(author_id=kwargs["author_id"])
        if author_followers.count() > 0:
            followers_data = []
            for af in author_followers:
                followers_data.append(af.friend)
            return Response(followers_data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(tags=['friends'])
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)