from re import template

from django.urls import path
from .views import *

urlpatterns = [
    path('', FileUploadView.as_view()),
    path('data', FileSubmitView.as_view()),
]