from pathlib import Path
from .base import *

DEBUG = False

DATABASES["default"]["ATOMIC_REQUESTS"] = True

ALLOWED_HOSTS = ["https://glacial-hollows-36810.herokuapp.com",
                 "localhost", "127.0.0.1"]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [Path.joinpath(BASE_DIR, "staticfiles")],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

STATICFILES_DIRS = [
    Path.joinpath(BASE_DIR.parent, 'build'),
]

STATIC_ROOT = Path.joinpath(BASE_DIR, 'staticfiles')
STATIC_URL = "/static/"

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
