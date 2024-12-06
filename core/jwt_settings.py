"""JWT response in login is handled here"""

import logging
import datetime
import pytz
from rest_framework.serializers import ValidationError
from main.models import (AccountsBlacklistTokensModel,  AccountsLoginAnalyticsModel)


def jwt_response_payload_handler(token, user=None, request=None, issued_at=None):
    """
    Custom response payload handler.
    """
    response = {}
    try:
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        if request.data.get("re_login"):
            try:
                token_obj = AccountsBlacklistTokensModel.objects.get(
                    user=user, is_login=True
                )
                token_obj.is_login = False
                token_obj.is_delete = True
                token_obj.save()
                AccountsBlacklistTokensModel.objects.create(
                    user=user, token=token, is_login=True
                )
            except Exception:
                AccountsBlacklistTokensModel.objects.create(
                    user=user, token=token, is_login=True
                )
        else:
            try:
                AccountsBlacklistTokensModel.objects.get(user=user, is_login=True)
                raise ValidationError({"message": "user have active session"})
            except AccountsBlacklistTokensModel.DoesNotExist:
                AccountsBlacklistTokensModel.objects.create(
                    user=user, token=token, is_login=True
                )
        default_login_analytics = {
            "user" : user, "ip_address" : ip, "device_name" : request.user_agent
        }
        login_analytics_obj, created = AccountsLoginAnalyticsModel.objects.get_or_create(
            user=user, ip_address=ip, device_name=request.user_agent,
            defaults=default_login_analytics
        )
        login_analytics_obj.login_count += 1
        login_analytics_obj.save()
        first_login = False
        if not user.last_login:
            first_login = True
            user.last_login = datetime.datetime.now(pytz.utc)
            user.save()
        response.update(
            {
                "token": token,
                "username": user.username,
                "email": user.email,
                "user_id": user.id,
                "profile_picture": user.profile_picture,
                "is_super_user" : user.is_superuser,
                "first_login": first_login,
                "ip_address": ip,
                "requeststatus": 1,
                # "timezone_info": timezone_info,
            }
        )
        return response
    except Exception as e:
        print("custom JWT error : ", e)
        if str(e)=="{'message': ErrorDetail(string='user have active session', code='invalid')}":
            raise ValidationError({"message": "user have active session"}) from e
        raise ValidationError({"message": "Something went wrong", "data": str(e)}) from e
