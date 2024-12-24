import jwt

from core.settings import SECRET_KEY
from main.models import ConversationModel, GroupModel, NotificationsModel
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from main.serializers import MessageSeralizer, NotificationSeralizer


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

def get_or_create_new_conversation(user1, user2):
    first_user_id = min(user1, user2)
    second_user_id = max(user1, user2)
    
    conversation, _ = ConversationModel.objects.get_or_create(
        user1_id=first_user_id, user2_id=second_user_id
    )
    conversation_id = f"new_chat_{first_user_id}_{second_user_id}"
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


def broadcast_group_conversations(conversation_name, group_id, is_new = False):
    channel_layer = get_channel_layer()
    group_instance = GroupModel.objects.get(id= group_id)
    print("pree")
    messages = group_instance.messages.all().order_by("-created_at")
    # messages = list(messages[:10])
    print("postt")
    print("11")
    message_data = MessageSeralizer(messages, many = True).data[::-1]
    print(909)
    broadcast_type = "group_chat" if not is_new else "new_message_group"
    broadcast_data = {
        "type" : broadcast_type,
        "results" : message_data,
    }
    convert_uuids_to_str(broadcast_data)
    async_to_sync(channel_layer.group_send)(
            conversation_name,
            broadcast_data,
    )


def broadcast_latest_message(conversation_instance : ConversationModel, conversation_name):
    channel_layer = get_channel_layer()
    print("pree")
    messages = conversation_instance.messages.all().order_by("-created_at")
    # messages = list(messages[:10])
    print("postt")
    print("11")
    message_data = MessageSeralizer(messages, many = True).data[::-1]
    print(909)
    broadcast_type = "new_message"
    broadcast_data = {
        "type" : broadcast_type,
        "results" : message_data,
    }
    convert_uuids_to_str(broadcast_data)
    async_to_sync(channel_layer.group_send)(
            conversation_name,
            broadcast_data,
    )



def broadcast_notifications(user_id):
    """notifications broadcasting to user."""
    conversation_name = f"notifications_{str(user_id)}"
    channel_layer = get_channel_layer()
    notifications = NotificationsModel.objects.filter(for_user_id = user_id).order_by("-created_at")
    unread_count = notifications.filter(is_read = False).count()
    total_count = notifications.count()
    notification_data = NotificationSeralizer(notifications.filter(is_read = False), many = True)
    broadcast_data = {
        "type": "notification_list",
        "notifications" : notification_data.data,
        "unread_count" : unread_count,
        "total_count" : total_count
    }
    convert_uuids_to_str(broadcast_data)

    async_to_sync(channel_layer.group_send)(
            conversation_name,
            broadcast_data,
        )


def broadcast_new_msg_notification(user_id):
    conversation_name = f"notifications_{str(user_id)}"
    channel_layer = get_channel_layer()
    broadcast_data = {
        "type": "new_notification",
    }
    convert_uuids_to_str(broadcast_data)

    async_to_sync(channel_layer.group_send)(
            conversation_name,
            broadcast_data,
        )

def create_notification_and_broadcast(
    for_user_id,
    message,
    route_data,
    notification_type):

    NotificationsModel.objects.create(
        for_user_id = for_user_id,
        message = message,
        route_data = route_data,
        notification_type = notification_type,
    )
    broadcast_notifications(user_id = for_user_id)