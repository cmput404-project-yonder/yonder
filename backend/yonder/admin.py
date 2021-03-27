from django.contrib import admin
from .models import Author, Post, Comment, AuthorFollower, AuthorFriend, RemoteNode, Inbox
# Register your models here.

admin.site.register(Author)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(AuthorFollower)
admin.site.register(AuthorFriend)
admin.site.register(RemoteNode)
