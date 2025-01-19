from django.urls import path
from . import views
from debug_toolbar.toolbar import debug_toolbar_urls

urlpatterns = [
    path('', views.index, name='index'),

] + debug_toolbar_urls()
