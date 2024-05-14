from rest_framework import viewsets
from rest_framework.response import Response

from .models import Conversation
from .serializer import MessageSerializer
from .schema import list_message_docs

# Create your views here.


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            message = conversation.message.all()
            print("Messages:", message)
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response([])
        
        
