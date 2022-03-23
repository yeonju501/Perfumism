from django.urls import path
from . import views

app_name = 'data_algorithms'

urlpatterns = [
    path('survey/', views.survey),
    path('like-based/', views.like_based),
]
