from .models import Author, AuthorFollower, AuthorFriend, Post, Inbox, RemoteNode, Like
from .serializers import AuthorSerializer, AuthorFriendSerializer, PostSerializer, LikeSerializer
from django.db.models.signals import post_save, pre_save, post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
import uuid
import requests
import re

def check_remote_follow(theirAuthor, ourAuthor):
    try:
        remoteNode = RemoteNode.objects.get(host=theirAuthor["host"])
    except RemoteNode.DoesNotExist:
        return False

    url = theirAuthor["host"] + "api/author/" + str(theirAuthor["id"]) + "/followers/" + str(ourAuthor["id"]) + "/"
    response = requests.get(url, auth=requests.models.HTTPBasicAuth(remoteNode.our_user, remoteNode.our_password))
    if response.status_code == 200:
        return True

    return False

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
        authorA_json = AuthorSerializer(instance=authorA).data
        try:
            authorB = Author.objects.get(pk=uuid.UUID(authorB_id))
            # Check if the follow relationship is 2-way
            _ = AuthorFollower.objects.get(author=authorB, follower=authorA_json)
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
                if authorA_friend_serializer.is_valid():
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

    # Set origin & source on creation
    instance.source = instance.get_absolute_url()
    if instance.origin == "":
        instance.origin = instance.source
        instance.save()
    
    if kwargs["created"] and instance.unlisted == False:
        # Get friend/followers
        listeners = []
        if instance.visibility == Post.Visibility.FRIENDS:
            listeners = AuthorFriend.objects.filter(author_id=instance.author)
        else:
            listeners = AuthorFollower.objects.filter(author_id=instance.author)

        for listener in listeners:
            listenerId = listener.friend["id"] if instance.visibility == Post.Visibility.FRIENDS else listener.follower["id"]
            listenerHost = listener.friend["host"] if instance.visibility == Post.Visibility.FRIENDS else listener.follower["host"]
            data = PostSerializer(instance=instance).data
            data["type"] = "post"
            try:
                    inbox = Inbox.objects.get(author_id=listenerId)
                    inbox.items.append(data)
                    inbox.save()
            except Inbox.DoesNotExist:
                # Handle follower being on remote server
                remoteNode = RemoteNode.objects.get(host=listenerHost)
                url = listenerHost + "api/author/" + str(listenerId) + "/inbox/"
                response = requests.post(url, 
                    json=data, 
                    headers={"content-type": "application/json"}, 
                    auth=requests.models.HTTPBasicAuth(remoteNode.our_user, remoteNode.our_password)
                )
                print(response.text)
            except RemoteNode.DoesNotExist:
                print("Unknown Host, WHO ARE YOU???")
    
@receiver(post_save, sender=Author)
def create_inbox(sender, instance, **kwargs):
    if kwargs["created"]:
        Inbox.objects.create(author=instance)

# @receiver(pre_save, sender=User)
# def set_inactive(sender, instance, **kwargs):
#     if instance.pk == None and not instance.is_staff and not instance.is_superuser:
#         instance.is_active = False

@receiver(post_delete, sender=AuthorFollower)
def delete_friend(sender, instance, **kwargs):
    
    try:
        authorA_friend = AuthorFriend.objects.get(author_id = instance.author_id, friend = instance.follower)
        authorA_friend.delete()
        authorA = Author.objects.get(id=instance.author_id)
        authorA_JSON = AuthorSerializer(instance=authorA).data
        authorB_friend = AuthorFriend.objects.get(author_id = instance.follower["id"], friend = authorA_JSON)
        authorB_friend.delete()

    except AuthorFriend.DoesNotExist:
        print("Users are already not friends")

    except Author.DoesNotExist:
        print("Author does not exist in database")
