from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    path('authors/', views.local_authors.as_view(), name="authors"),
    path('authors/all/', views.local_remote_authors.as_view(), name="all_authors"),
    path('author/<str:pk>/', views.author_detail.as_view(), name="author_detail"),
    path('author/<str:author_id>/posts/', views.posts.as_view(), name="posts"),
    path(
        'author/<str:author_id>/posts/<str:pk>/',
        views.post_detail.as_view(),
        name="post_detail"
    ),
    path(
        'author/<str:author_id>/posts/<str:post_id>/comments/',
        views.comments.as_view(),
        name="comments"
    ),
    path(
        'author/<str:author_id>/posts/<str:post_id>/comments/<str:pk>/',
        views.comment_detail.as_view(),
        name="comment_detail"
    ),
    path(
        'author/<str:author_id>/followers/',
        views.author_followers.as_view({'get': 'list'}),
        name="follower_list"
    ),
    path(
        'author/<str:author_id>/followers/<str:follower_id>/',
        views.author_followers_detail.as_view({'get': 'retrieve', 'put': 'create', 'delete': 'destroy'}),
        name="followers"
    ),
    path(
        'author/<str:author_id>/inbox/',
        views.inbox.as_view(),
        name="inbox"
    ),
    url('login', views.login.as_view(), name='login'),
    url('signup', views.signup.as_view(), name='signup'),
    url('logout', views.logout.as_view(), name='logout'),
]
