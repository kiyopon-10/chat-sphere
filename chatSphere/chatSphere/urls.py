from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from webchat.consumer import WebChatConsumer

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/docs/schema', SpectacularAPIView.as_view(), name="schema"),
    path('api/docs/schema/ui', SpectacularSwaggerView.as_view()),
    path('api/server/', include('server.urls')),
    path('api/messages/', include('webchat.urls')),
]

websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())
]

if settings.DEBUG :
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
