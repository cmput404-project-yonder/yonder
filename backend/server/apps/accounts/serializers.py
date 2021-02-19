from rest_framework import serializers
from .models import Post, Author, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','title','source','origin','description','author','categories','count','size','comments','published','visibility','unlisted')

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id','host','displayName','url','github')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id','author','comment','contentType','published')
