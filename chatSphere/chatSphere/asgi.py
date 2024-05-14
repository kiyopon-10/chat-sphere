from channels.routing import URLRouter, ProtocolTypeRouter
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chatSphere.settings')

django_application = get_asgi_application()

from . import urls

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(urls.websocket_urlpatterns),
})
