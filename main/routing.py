from django.urls import path
from main import consumers

websocket_url_patterns = [
    path('ws/conversation-chat/', consumers.ChatConversationListConsumer.as_asgi()),
    path('ws/group-chat/', consumers.ChatGroupConversationListConsumer.as_asgi()),
]
