from django.conf.urls import url, include
from django.urls import path, re_path
from . import views

accounts_urlpatterns = [
    re_path(r'^api/author/$', views.author_detail),
    re_path(r'^api/author/$/posts/$', views.post_detail),
    re_path(r'^api/author/$/posts/$/comments/$', views.comment_detail),
    path('api/login', views.login.as_view()),
    path('api/register', views.register.as_view()),
]
