from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

from .models import Message, Conversation
from django.contrib.auth import get_user_model

User = get_user_model()

class WebChatConsumer(JsonWebsocketConsumer):
    # groups = ["broadcast"]
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.channel_id = None

        self.user = None

    # when a user connects to a particular channel the websocket request is made with the serverId and channelId in the url
    # and the user is added to the chat room or group ( identified by the channel_id).
    def connect(self):
        self.accept()
        
        # print(self.scope)
        
        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"] # we get the channel id from the scope.
        
        self.user = User.objects.get(id=1)
        
        async_to_sync(self.channel_layer.group_add)(
            self.channel_id,
            self.channel_name
        )

    def receive_json(self, content):
        channel_id = self.channel_id
        sender = self.user
        message = content["message"]
        conversation, created = Conversation.objects.get_or_create(channel_id = channel_id)
        # get_or_create will return a tuple consisting of the object retrieved and a boolean on whether the object was created.
        
        new_message = Message.objects.create(conversation = conversation, sender = sender, content=message)
        
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "new_message": {
                    "id": new_message.id,
                    "sender": new_message.sender.username,
                    "content": new_message.content,
                    "timestamp": new_message.timestamp.isoformat()      
                },
            }
        )
        
    # name of the function should be same as the type with underscore in between
    def chat_message(self, event):
        self.send_json(event)

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        super().disconnect(close_code)

