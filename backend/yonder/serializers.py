from rest_framework import serializers
from .models import Post, Author, Comment, AuthorFollower, AuthorFriend, RemoteNode, RemoteAuthor, RemoteAuthorFollower, RemoteAuthorFriend
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'host', 'displayName', 'github')


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(required=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'source', 'origin', 'description', 'content', 'contentType', 'author', 'categories',
                  'count', 'size', 'published', 'visibility', 'unlisted')

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
    class Meta:
        model = Comment
        fields = ('id', 'author', 'post', 'comment',
                  'contentType', 'published')


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
        fields = ('author', 'follower')

class AuthorFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthorFriend
        fields = ('author', 'friend')

class RemoteNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteNode
        fields = ('host')

class RemoteAuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteAuthor
        fields = ('id', 'host', 'displayName', 'github', 'remote_node')

class RemoteAuthorFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteAuthorFollower
        fields = ('author', 'remote_follower')

class RemoteAuthorFriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemoteAuthorFriend
        fields = ('author', 'remote_friend')
