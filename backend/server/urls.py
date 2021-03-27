from django.contrib import admin
from django.conf.urls import url
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.shortcuts import render

schema_view = get_schema_view(
    openapi.Info(
        title="Yonder API",
        default_version='v1',
        description="Yonder API documentation",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


def render_react(request):
    return render(request, "index.html")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("yonder.urls")),
    re_path('api/swagger/?', schema_view.with_ui('swagger',
                                                 cache_timeout=0), name='schema-swagger-ui'),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
