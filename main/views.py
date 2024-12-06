from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, views
from rest_framework import permissions

from main.models import ContactModel, HolidayModel, MessageModel, UserModel
from main.utils import broadcast_one_to_one_conversations, get_or_create_conversation
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
            user_id = data.pop('user_id', None)
            data["created_by"] = request.user
            conversation_name, conversation_instance = get_or_create_conversation(int(request.user.id), int(user_id))
            message_instance = MessageModel.objects.create(**data)
            conversation_instance.messages.add(message_instance)
            conversation_instance.save()
            broadcast_one_to_one_conversations(
                conversation_instance=conversation_instance,
                conversation_name= conversation_name
            )
            return Response({"message" : "Message sent"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"message" : "Something went wrong", "data" : str(e) }, status=status.HTTP_400_BAD_REQUEST)