from django.urls import path
from .views import ServerListViewSet, CategoryListViewSet

urlpatterns = [
    path('select/', ServerListViewSet.as_view({'get': 'list'})),
    path('category/', CategoryListViewSet.as_view({'get': 'list'})),
]