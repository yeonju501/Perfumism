from django.urls import path
from . import views

app_name = 'data_algorithms'

urlpatterns = [
    # path('survey/', views.survey),
    path('<int:member_pk>/like-based/', views.like_based),
]
