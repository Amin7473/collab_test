
import logging
import json
from urllib.parse import parse_qs 
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
from django.db.models import Q
from main.models import ConversationModel
from main.utils import broadcast_one_to_one_conversations, decode_and_validate_jwt_token, get_or_create_conversation

class ChatConversationListConsumer(WebsocketConsumer):
    """Consumer for getting conversations from a particular ticket"""


    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.conversation_name = None

    def connect(self):
        self.accept()
        try:
            query_string_bytes = self.scope.get("query_string", b"")
            query_string = parse_qs(query_string_bytes.decode("utf-8"))
            user_id, is_valid_token = decode_and_validate_jwt_token(
                query_string["token"][0]
            )
            chat_id = str(query_string.get("chat_id")[0])
            if not (user_id or chat_id or is_valid_token):
                self.disconnect("UNAUTHORIZED")
            
            self.conversation_name, conversation_instance = get_or_create_conversation(user1=int(user_id), user2=int(chat_id))

            print("zzzzz", self.conversation_name)
            async_to_sync(self.channel_layer.group_add)(
                self.conversation_name,
                self.channel_name,
            )
            broadcast_one_to_one_conversations(
                conversation_instance=conversation_instance,
                conversation_name= self.conversation_name
            )
            # broadcast_task_list(user_id = user_id)

        except Exception as e:
            self.disconnect(close_code=f"Ticket Conversation socket was disconnected due to , {str(e)}")

    def receive(self, text_data=None, bytes_data=None):
        try:
            text_data_json = json.loads(text_data)
            wss_type = text_data_json["type"]
            query_string_bytes = self.scope.get("query_string", b"")
            query_string = parse_qs(query_string_bytes.decode("utf-8"))
            user_id, is_valid_token = decode_and_validate_jwt_token(query_string["token"][0])
            ticket_id = str(query_string.get("ticket_id")[0])
        except Exception as e:
            print(f"Conversation receive Exception, {str(e)}")

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.conversation_name,
            self.channel_name,
        )

    def one_to_one_chat(self, event):
        self.send(text_data=json.dumps(event))

    def next_messages(self, event):
        self.send(text_data=json.dumps(event))
