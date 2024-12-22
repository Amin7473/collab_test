from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework import permissions

from main.models import AttachmentModel, ContactModel, GroupModel, HolidayModel, MessageModel, UserModel
from main.utils import broadcast_group_conversations, broadcast_latest_message, broadcast_one_to_one_conversations, get_or_create_conversation, get_or_create_new_conversation
# Create your views here.


class ContactsAPIView(views.APIView):
    def get(self, request):
        try:
            data = ContactModel.objects.all().values()
            return Response({"results" : data, "message" : "Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            ContactModel.objects.create(**request.data)
            return Response({"message" : "Contact created"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            data = request.data
            ContactModel.objects.filter(id = data.pop("id")).update(**data)
            return Response({"message" : "Contact updated"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            data = request.data
            ContactModel.objects.filter(id = data.pop("id")).delete()
            return Response({"message" : "Contact deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)


class HolidaysAPIView(views.APIView):
    def get(self, request):
        try:
            data = HolidayModel.objects.all().values()
            return Response({"results" : data, "message" : "Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            HolidayModel.objects.create(**request.data)
            return Response({"message" : "Holiday created"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            data = request.data
            HolidayModel.objects.filter(id = data.pop("id")).update(**data)
            return Response({"message" : "Holiday updated"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            data = request.data
            HolidayModel.objects.filter(id = data.pop("id")).delete()
            return Response({"message" : "Holiday deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)


class GetUsersAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            data = UserModel.objects.all().values("id", "username", "email", "profile_picture", "last_login")
            return Response({"results" : data, "message" : "Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)


class MessageAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            data = request.data
            attachments = request.FILES.pop("attachments", [])
            if type(data) != dict:
                data = data.dict()
            user_id = data.pop('user_id', None)
            data.pop("attachments", None)
            data["created_by"] = request.user
            print("data", data)
            conversation_name, conversation_instance = get_or_create_new_conversation(int(request.user.id), int(user_id))
            message_instance = MessageModel.objects.create(**data)
            for attachment in attachments:
                file_instance = AttachmentModel.objects.create(file = attachment)
                message_instance.attachments.add(file_instance)
                message_instance.save()
            conversation_instance.messages.add(message_instance)
            conversation_instance.save()
            broadcast_latest_message(
                conversation_instance=conversation_instance,
                conversation_name= conversation_name
            )
            return Response({"message" : "Message sent"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)


class GroupsAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        try:
            user = request.user
            data = GroupModel.objects.filter(users = user).values()
            print(data)
            for group in data:
                group["users"] = GroupModel.objects.get(id = group["id"]).users.all().values("id", "username", "email", "profile_picture", "last_login")
            return Response({"results" : data, "message" : "Success"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            data = request.data
            users = data.pop("users", [])
            group = GroupModel.objects.create(**data)
            group.users.set(users)
            return Response({"message" : "Group created"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            data = request.data
            pk = data.pop("id")
            group = GroupModel.objects.get(id = pk)
            users = data.pop("users", group.users.all())
            GroupModel.objects.filter(id = data.pop("id")).update(**data)
            group = GroupModel.objects.get(id = pk)
            group.users.set(users)
            return Response({"message" : "Group updated"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        try:
            data = request.data
            GroupModel.objects.filter(id = data.pop("id")).delete()
            return Response({"message" : "Group deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)


class GroupMessageAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        try:
            data = request.data
            attachments = request.FILES.pop("attachments", [])
            if type(data) != dict:
                data = data.dict()
            data.pop("attachments", None)
            group_id = data.pop('group_id', None)
            group_instance = GroupModel.objects.get(id = group_id)
            data["created_by"] = request.user
            conversation_name  = f"new_group_chat_{group_id}"
            message_instance = MessageModel.objects.create(**data)
            for attachment in attachments:
                file_instance = AttachmentModel.objects.create(file = attachment)
                message_instance.attachments.add(file_instance)
                message_instance.save()
            group_instance.messages.add(message_instance)
            group_instance.save()
            broadcast_group_conversations(
                conversation_name= conversation_name,
                group_id=group_id,
                is_new=True
            )
            return Response({"message" : "Message sent"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)
