from rest_framework import serializers
from .models import Post, Author, Comment, Inbox, AuthorFollower, AuthorFriend, RemoteNode, Like
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from rest_framework.fields import UUIDField

class AuthorSerializer(serializers.ModelSerializer):
    type = 'author'
    class Meta:
        model = Author
        fields = ('id', 'host', 'displayName', 'github')
        read_only_fields = ['type']
        


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(required=True)
    type = 'post'

    class Meta:
        model = Post
        fields = ('id', 'title', 'source', 'origin', 'description', 'content', 'contentType', 'author', 'categories',
                  'count', 'size', 'published', 'visibility', 'unlisted')
        read_only_fields = ['type']

    def create(self, validated_data):
        author_data = dict(validated_data.pop("author"))
        author = Author.objects.get(displayName=author_data["displayName"])
        post = Post.objects.create(**validated_data, author=author)

        return post

    def update(self, instance, validated_data):
        _ = dict(validated_data.pop("author"))
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        return instance


class CommentSerializer(serializers.ModelSerializer):
    type = 'comment'

    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'comment',
                  'contentType', 'published')
        read_only_fields = ['type']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'author')
        extra_kwargs = {'password': {'write_only': True}}

    def get_author(self, obj):
        try:
            author = obj.author
            return AuthorSerializer(author).data
        except:
            return None


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("username or password Incorrect")

        return data


class RegisterSerializer(serializers.ModelSerializer):
    displayName = serializers.CharField(required=True, max_length=100)
    github = serializers.URLField(allow_blank=True, required=False)

    class Meta:
        model = User
        fields = ['username', 'password', 'displayName', 'github']
        write_only_fields = ['password']

    def validate(self, data):
        author = Author.objects.filter(displayName=data['displayName'])
        if author.exists():
            raise serializers.ValidationError(
                'user with this display name already exists')
        else:
            return data

    def create(self, data):
        user = User.objects.create_user(
            username=data['username']
        )

        user.set_password(data['password'])
        user.save()

        return user

class AuthorFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorFollower
        fields = ('author', 'follower', 'created_at')

class AuthorFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorFriend
        fields = ('author', 'friend', 'created_at')

class RemoteNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteNode
        fields = ('host')
        
class InboxSerializer(serializers.ModelSerializer):
    items = serializers.ListField(child=serializers.JSONField(), default=list)

    class Meta:
        model = Inbox
        fields = ('id', 'author', 'items')

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'author', 'object_url')