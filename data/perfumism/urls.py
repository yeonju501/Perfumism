from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('data_algorithms/', include('data_algorithms.urls'))
]
