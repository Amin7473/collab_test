
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import gettext as _
from django.db.models import Q

from main.models import AttachmentModel, MessageModel, NotificationsModel

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER

class CustomJWTSerializer(JSONWebTokenSerializer):
    """Custom JWT serializer"""
    username_field = "email"

    def validate(self, data):
        """validating user input for login"""
        try:
            password = data.get("password")
            email = data.get("email")
            error_list = []
            user_obj = get_user_model().objects.get(Q(email__iexact=email) | Q(username__iexact=email))
            if not user_obj.check_password(password):
                error_list.append({"password" : "Uh-oh! It appears that the password entered is incorrect."})
                raise serializers.ValidationError({"message": error_list})

            if not user_obj.is_active:
                error_list.append({"email": "User account not active"})

                raise serializers.ValidationError({"message": error_list})

            credentials = {"username": user_obj.email, "password": password}
            user = authenticate(**credentials)
            if user:
                payload = jwt_payload_handler(user)
                return {"token": jwt_encode_handler(payload), "user": user}
            else:
                error_list.append({"authentication": "Failed"})
                raise serializers.ValidationError({"message": "Authentication failed"})

        except get_user_model().DoesNotExist:
            # error_list.append({"email": "User with this email does not exist"})
            raise serializers.ValidationError(
                {"message": {"email": "Uh-oh! It appears that the credentials entered is incorrect."}}
            )
        except Exception as e:
            if (
                str(e)
                == "{'message': [{'password': ErrorDetail(string='Uh-oh! It appears that the password entered is incorrect.', code='invalid')}]}"
            ):
                raise serializers.ValidationError(
                    {"message": {"password": "Incorrect password"}}
                )
            elif (
                str(e)
                == "{'message': [{'email': ErrorDetail(string='Uh-oh! It appears that the account is not yet active', code='invalid')}]}"
            ):
                raise serializers.ValidationError(
                    {"message": {"email": "User email does not exist"}}
                )
            raise serializers.ValidationError(str(e))


class AttachmentSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField()
    file_size = serializers.SerializerMethodField()
    file_extension = serializers.SerializerMethodField()
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = AttachmentModel
        fields = "__all__"

    def get_file_name(self, obj):
        return obj.file.name.split("/")[-1]

    def get_file_size(self, obj):
        return obj.file.size
    
    def get_file_extension(self, obj):
        return obj.file.name.split(".")[-1]

    def get_file_url(self, obj):
        return f'http://localhost:8000{obj.file.url}'

class MessageSeralizer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source = "created_by.username", allow_blank=True)
    created_by_profile_picture = serializers.CharField(source = "created_by.profile_picture", allow_blank=True)
    attachments =  AttachmentSerializer(read_only=True, many=True)

    class Meta:
        model = MessageModel
        fields = "__all__"


class NotificationSeralizer(serializers.ModelSerializer):
    class Meta:
        model = NotificationsModel
        fields = "__all__"
