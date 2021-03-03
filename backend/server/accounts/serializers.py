from rest_framework import serializers
from .models import Post, Author, Comment
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'source', 'origin', 'description', 'author', 'categories',
                  'count', 'size', 'comments', 'published', 'visibility', 'unlisted')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'host', 'displayName', 'url', 'github')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'author', 'comment', 'contentType', 'published')


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
    github = serializers.URLField()

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
