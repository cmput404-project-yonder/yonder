from django.conf.urls import url, include
from django.urls import path, re_path
from . import views

accounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
    re_path(r'^api/author/$', views.author_detail),
    re_path(r'^api/author/$/posts/$', views.post_detail),
    re_path(r'^api/author/$/posts/$/comments/$', views.comment_detail),
]