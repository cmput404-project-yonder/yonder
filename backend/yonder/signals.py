from .models import Author, AuthorFollower, AuthorFriend, Post, Inbox
from .serializers import AuthorSerializer, AuthorFriendSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core import serializers
import uuid
import requests
import json


def check_remote_follow(theirAuthor, ourAuthor):
    url = theirAuthor["url"] + "/followers/" + ourAuthor["id"]
    response = requests.get(url)
    if requests.status_code == 404:
        return False
    elif requests.status_code == 200:
        return True

# Our Server:
# B follows A
# check if A->B exist, if so then create Friend object
# Other servers (A: our server,  B: other server):
# A follows B => same as our server scenario
# B follows A => call author/B/followers/A to check if A->B exists
@receiver(post_save, sender=AuthorFollower)
def create_friend(sender, instance, **kwargs):
    if kwargs["created"]:
        authorB_id = instance.follower["id"]
        authorA = instance.author
        authorA_json = AuthorSerializer(authorA).data
        try:
            authorB = Author.objects.get(pk=uuid.UUID(authorB_id))
            authorB_follow = AuthorFollower.objects.get(author=authorB, follower=authorA_json)
            # Create the friendship both ways
            authorA_friend_serializer = AuthorFriendSerializer(data={
                "author": authorA.id,
                "friend": instance.follower
            })
            authorB_friend_serializer = AuthorFriendSerializer(data={
                "author": authorB.id,
                "friend": authorA_json
            })
            authorA_friend_serializer.is_valid()
            authorB_friend_serializer.is_valid()
            authorA_friend_serializer.save()
            authorB_friend_serializer.save()
        except Author.DoesNotExist:
            # Handle remote server request
            if check_remote_follow(instance.follower, authorA_json):
                # Save this friendship for our author
                authorA_friend_serializer = AuthorFriendSerializer(data={
                    "author": authorA.id,
                    "friend": instance.follower
                })
                authorA_friend_serializer.save()
        except AuthorFollower.DoesNotExist:
            # The relationship is only one-way, so ignore
            return

@receiver(post_save, sender=AuthorFollower, dispatch_uid='signal_handler_follow_save')
def follow_to_inbox(sender, instance, **kwargs):
    if kwargs["created"]:
        follower = instance.follower
        inbox = Inbox.objects.get(author_id=instance.author)
        data = serializers.serialize('json',[instance]) 
        inbox.items.append(data)
        inbox.save()

@receiver(post_save, sender=Post,dispatch_uid='signal_handler_post_save')
def create_post(sender, instance, **kwargs):
    if kwargs["created"]:
        instance.source = instance.get_absolute_url()
        if instance.origin:
            instance.origin = instance.source
        try:
            follows = AuthorFollower.objects.all().filter(author_id=instance.author)
            for follow in follows:
                data = serializers.serialize('json',[instance])
                inbox = Inbox.objects.get(author_id=follow.follower["id"])
                inbox.items.append(data)
                inbox.save()
        except AuthorFollower.DoesNotExist:
            print("No followers")
        finally:
            instance.save()

@receiver(post_save, sender=Author)
def create_inbox(sender, instance, **kwargs):
    if kwargs["created"]:
        Inbox.objects.create(author=instancew)

'''
@receiver(post_save, sender=Liked)
def like_to_inbox(sender, instance, **kwargs):
    src_author_id = re.match('(?<=/author/).*(?=/posts)', instance.object)
    inbox = Inbox.objects.get(author_id=src_author_id)
    if inbox.exists():
        data = serializers.serialize('json', instance)
        inbox.items.append(data)
        inbox.save()
'''
