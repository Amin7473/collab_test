from django.contrib import admin
from django.urls import include, path
from rest_framework_jwt.views import ObtainJSONWebTokenView
from main import views
from main.serializers import CustomJWTSerializer

urlpatterns = [
    path(
        "user-login/",
        ObtainJSONWebTokenView.as_view(serializer_class=CustomJWTSerializer),
        name="LoginAPIView",
    ),
    path('contacts/', view=views.ContactsAPIView.as_view(), name="ContactsAPIView"),
    path('holidays/', view=views.HolidaysAPIView.as_view(), name="HolidaysAPIView"),
    path('get-users/', view=views.GetUsersAPIView.as_view(), name="GetUsersAPIView"),
    path('messages/', view=views.MessageAPIView.as_view(), name="MessageAPIView"),
    path('groups/', view=views.GroupsAPIView.as_view(), name="GroupsAPIView"),
    path('group-message/', view=views.GroupMessageAPIView.as_view(), name="GroupMessageAPIView"),
    path('excel-data/', view=views.ExcelDataAPIView.as_view(), name="ExcelDataAPIView"),
]
