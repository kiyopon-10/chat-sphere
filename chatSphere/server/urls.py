from django.urls import path
from .views import ServerListViewSet, CategoryListViewSet

urlpatterns = [
    path('server/select/', ServerListViewSet.as_view({'get': 'list'})),
    path('server/category/', CategoryListViewSet.as_view({'get': 'list'})),
]