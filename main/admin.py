from django.contrib import admin

from main.models import ContactModel, GroupModel, HolidayModel, UserModel, MessageModel, ConversationModel

# Register your models here.
admin.site.register(ContactModel)
admin.site.register(HolidayModel)
admin.site.register(UserModel)
admin.site.register(MessageModel)
admin.site.register(ConversationModel)
admin.site.register(GroupModel)