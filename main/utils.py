import jwt

from core.settings import SECRET_KEY
from main.models import ConversationModel
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from main.serializers import MessageSeralizer


def decode_and_validate_jwt_token(token : str):
    """Method to decode and validate if the token is of an active session"""

    try:
        # Replace 'verify' with 'True' to enable signature verification if necessary
        decoded_data = jwt.decode(token, SECRET_KEY, verify=True)
        return decoded_data["user_id"], True
    except Exception as e:
        print('decode jwt', e)
        return None, False


from collections import OrderedDict
import uuid
def convert_uuids_to_str(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, uuid.UUID):
                data[key] = str(value)
            elif isinstance(value, (dict, list)):
                convert_uuids_to_str(value)
    elif isinstance(data, list):
        for index, item in enumerate(data):
            if isinstance(item, uuid.UUID):
                data[index] = str(item)
            elif isinstance(item, (dict, list)):
                convert_uuids_to_str(item)
    elif isinstance(data, OrderedDict):
        for key, value in data.items():
            if isinstance(value, uuid.UUID):
                data[key] = str(value)
            elif isinstance(value, (dict, list)):
                convert_uuids_to_str(value)


def get_or_create_conversation(user1, user2):
    first_user_id = min(user1, user2)
    second_user_id = max(user1, user2)
    
    conversation, _ = ConversationModel.objects.get_or_create(
        user1_id=first_user_id, user2_id=second_user_id
    )
    conversation_id = f"chat_{first_user_id}_{second_user_id}"
    return (conversation_id, conversation)


def broadcast_one_to_one_conversations(conversation_instance : ConversationModel, conversation_name):
    channel_layer = get_channel_layer()
    print("pree")
    messages = conversation_instance.messages.all().order_by("-created_at")
    # messages = list(messages[:10])
    print("postt")
    print("11")
    message_data = MessageSeralizer(messages, many = True).data[::-1]
    print(909)
    broadcast_type = "one_to_one_chat"
    broadcast_data = {
        "type" : broadcast_type,
        "results" : message_data,
    }
    convert_uuids_to_str(broadcast_data)
    async_to_sync(channel_layer.group_send)(
            conversation_name,
            broadcast_data,
    )
