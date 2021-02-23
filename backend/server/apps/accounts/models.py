from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, unique=True)
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    host = models.URLField(null=False, blank=False)
    displayName = models.CharField(max_length=100)
    url = models.URLField(blank=True)
    github = models.URLField()


# @receiver(post_save, sender=User)
# def create_user_author(sender, instance, created, **kwargs):
#     if created:
#         Author.objects.create(user=instance)
#     else:
#         instance.author.save()


# @receiver(post_save, sender=User)
# def save_user_author(sender, instance, **kwargs):
#     instance.author.save()


class Comment(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    contentType = models.CharField(max_length=100)
    published = models.DateTimeField()


class Post(models.Model):
    id = models.UUIDField(unique=True, default=uuid.uuid4,
                          editable=False, primary_key=True)
    title = models.CharField(max_length=100)
    source = models.URLField()
    origin = models.URLField()
    description = models.CharField(max_length=500)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    categories = models.JSONField()
    count = models.IntegerField()
    size = models.IntegerField()
    comments = models.URLField()
    published = models.DateTimeField()
    visibility = models.CharField(max_length=10)
    unlisted = models.BooleanField()
