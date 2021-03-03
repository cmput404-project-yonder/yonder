from django.conf.urls import url
from django.urls import path

from . import views

urlpatterns = [
    path('author/<uuid:pk>', views.author_detail.as_view(), name="author_detail"),
    path('author/<uuid:author_id>/posts/', views.posts.as_view(), name="posts"),
    path(
        'author/<uuid:author_id>/posts/<int:pk>',
        views.post_detail.as_view(),
        name="post_detail"
    ),
    path(
        'author/<uuid:author_id>/posts/<int:post_id>/comments/',
        views.comments.as_view(),
        name="comments"
    ),
    path(
        'author/<uuid:author_id>/posts/<int:post_id>/comments/<int:pk>',
        views.comment_detail.as_view(),
        name="comment_detail"
    ),
    url('login', views.login.as_view(), name='login'),
    url('signup', views.signup.as_view(), name='signup'),
    url('logout', views.logout.as_view(), name='logout'),
]
