from django.conf.urls import url, include
from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^author/$', views.author_detail),
    re_path(r'^author/$/posts/$', views.post_detail),
    re_path(r'^author/$/posts/$/comments/$', views.comment_detail),
    url(r'^login', views.login.as_view(), name='login'),
    url(r'^signup', views.signup.as_view(), name='signup'),
    url(r'^logout', views.logout.as_view(), name='logout'),
]
