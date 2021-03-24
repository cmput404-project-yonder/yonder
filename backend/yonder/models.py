from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import ArrayField
from django.core import serializers
import uuid
import re


class ContentTypes(models.TextChoices):
    TEXT = 'text/plain', _('Plaintext')
    MARKDOWN = 'text/markdown', _('Markdown')
    BINARY = 'application/base64', _('Binary')
    PNG = 'image/png;base64', _('PNG')
    JPEG = 'image/jpeg;base64', _('JPEG')


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    host = models.URLField(blank=True)
    displayName = models.CharField(max_length=100)
    github = models.URLField(null=True, blank=True)

    def get_absolute_url(self):
        return self.host + "/author/%s" % self.id


class Post(models.Model):
    class Visibility(models.TextChoices):
        PUBLIC = 'PUBLIC', _('Public')
        PRIVATE = 'PRIVATE', _('Private')

    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    title = models.CharField(max_length=80)
    source = models.URLField()
    origin = models.URLField()
    description = models.CharField(max_length=140)
    content = models.TextField()
    contentType = models.CharField(
        max_length=20,
        choices=ContentTypes.choices,
        default=ContentTypes.TEXT,
    )
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = ArrayField(models.CharField(
        max_length=80), size=5, null=True, blank=True)
    count = models.IntegerField(default=0)
    size = models.IntegerField(default=0)
    published = models.DateTimeField(auto_now_add=True)
    visibility = models.CharField(
        max_length=8,
        choices=Visibility.choices,
        default=Visibility.PUBLIC,
    )
    unlisted = models.BooleanField()

    def get_absolute_url(self):
        return self.author.get_absolute_url() + "/posts/%s" % self.id


class Comment(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    comment = models.CharField(max_length=400)
    contentType = models.CharField(
        max_length=20,
        choices=ContentTypes.choices,
        default=ContentTypes.TEXT,
    )
    published = models.DateTimeField()

    def get_absolute_url(self):
        return self.post.get_absolute_url() + "/comments/%s" % self.id

class AuthorFollower(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    follower = models.JSONField()

class AuthorFriend(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    friend = models.JSONField()

class RemoteNode(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    host = models.URLField(unique=True)
    
class Inbox(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    items = ArrayField(models.JSONField(), default=list)

@receiver(post_save, sender=Post)
def post_to_inbox(sender, instance, **kwargs):
    follows = AuthorFollower.objects.all()
    for follow in follows:
        follower = serializers.deserialize('json',follow.follower)
        for obj in follower:
            inbox = Inbox.objects.get(author_id=obj.object.pk)
            data = serializers.serialize('json',[instance]) 
            inbox.items.append(data)
            inbox.save()
       
'''
@receiver(post_save, sender=AuthorFollower)
def follow_to_inbox(sender, instance, **kwargs):
    followee = instance.object
    inbox = Inbox.objects.get(author_id=followee.id)
    if inbox.exists():
        data = serializers.serialize('json',instance) 
        inbox.items.append(data)
        inbox.save()
    
 
@receiver(post_save, sender=Liked)
def like_to_inbox(sender, instance, **kwargs):
    src_author_id = re.match('(?<=/author/).*(?=/posts)', instance.object)
    inbox = Inbox.objects.get(author_id=src_author_id)
    if inbox.exists():
        data = serializers.serialize('json', instance)
        inbox.items.append(data)
        inbox.save()
'''
