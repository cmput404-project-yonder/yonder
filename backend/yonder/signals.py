from .models import Author, AuthorFollower, AuthorFriend, Post, Inbox, RemoteNode
from .serializers import AuthorSerializer, AuthorFriendSerializer, AuthorFollowerSerializer, PostSerializer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core import serializers
import uuid
import requests
import json


def check_remote_follow(theirAuthor, ourAuthor):
    try:
        remoteNode = RemoteNode.objects.get(host=theirAuthor["host"])
    except RemoteNode.DoesNotExist:
        return False

    url = theirAuthor["host"] + "/api/author/" + str(theirAuthor["id"]) + "/followers/" + str(ourAuthor["id"]) + "/"
    response = requests.get(url, auth=requests.models.HTTPBasicAuth(remoteNode.our_user, remoteNode.our_password))
    if response.status_code == 404:
        return False
    elif response.status_code == 200:
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
        inbox = Inbox.objects.get(author_id=instance.author)
        data = instance.follower
        data["type"] = "follow"
        inbox.items.append(data)
        inbox.save()

@receiver(post_save, sender=Post,dispatch_uid='signal_handler_post_save')
def create_post(sender, instance, **kwargs):
    if kwargs["created"]:
        # Set origin & source on creation
        instance.source = instance.get_absolute_url()
        if instance.origin == "":
            instance.origin = instance.source

        # Send out to follower Inboxes
        followers = AuthorFollower.objects.filter(author_id=instance.author)
        for follower in followers:
            data = PostSerializer(instance=instance).data
            data["type"] = "post"
            try:
                    inbox = Inbox.objects.get(author_id=follower.follower["id"])
                    inbox.items.append(data)
                    inbox.save()
            except Inbox.DoesNotExist:
                # Handle follower being on remote server
                remoteNode = RemoteNode.objects.get(host=follower.follower["host"])
                url = follower.follower["host"] + "api/author/" + str(follower.follower["id"]) + "/inbox/"
                response = requests.post(url, data=data, auth=requests.models.HTTPBasicAuth(remoteNode.our_user, remoteNode.our_password))
                print(response.text)
            except RemoteNode.DoesNotExist:
                print("Unknown Host, WHO ARE YOU???")
            finally:
                instance.save()

@receiver(post_save, sender=Author)
def create_inbox(sender, instance, **kwargs):
    if kwargs["created"]:
        Inbox.objects.create(author=instance)

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
