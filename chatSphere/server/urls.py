from django.urls import path
from .views import ServerListViewSet

urlpatterns = [
    path('server/select/', ServerListViewSet.as_view({'get': 'list'})),
]