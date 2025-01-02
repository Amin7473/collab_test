import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)


# Create your models here.
class CoreGenericModel(models.Model):
    """
        This class is inherited by all models throught the application
    """
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    
    class Meta:
        """Meta properties"""
        abstract = True



class CustomUserManager(BaseUserManager):
    """Custom user manager to create superuser or user"""

    def create_superuser(self, email, password):
        """for super user creation"""
        if email is None:
            raise ValueError("email")

        email = self.normalize_email(email)
        user = self.model(email=email)
        user.is_superuser = True
        user.is_active = True
        user.is_staff = True

        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """for user creation"""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password is not None:
            user.set_password(password)
        user.save(using=self._db)
        return user


class UserModel(AbstractBaseUser, PermissionsMixin, CoreGenericModel):
    """User model"""
    username = models.CharField(max_length=100, null=True, blank=True, unique=True)
    email = models.EmailField(blank=True, max_length=255, null=True, unique=True)
    profile_picture = models.TextField(null=True, blank=True)
    country_code = models.CharField(max_length=20, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    timezone_info = models.CharField(max_length=50, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = "email"

    objects = CustomUserManager()

    class Meta:
        db_table = "USERS"

    def __str__(self):
        return str(self.email)

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True


class ContactModel(CoreGenericModel):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    status = models.BooleanField(default=False)

    
class HolidayModel(CoreGenericModel):
    holiday_name = models.CharField(max_length=100)
    holiday_date = models.DateField()



class AccountsBlacklistTokensModel(CoreGenericModel):
    """AccountsBlacklistTokensModel"""
    token = models.CharField(max_length=500)
    user = models.ForeignKey(
        UserModel, related_name="BlacklistTokensModel_user", on_delete=models.CASCADE
    )
    is_login = models.BooleanField(default=True)
    is_delete = models.BooleanField(default=False)

    # model managers
    objects = models.Manager()

    class Meta:
        db_table = "BLACKLIST_TOKENS"
        unique_together = ("token", "user")
        verbose_name = "Blacklist Token Model"
        verbose_name_plural = "Blacklist Token Models"


class AccountsLoginAnalyticsModel(CoreGenericModel):
    """AccountsLoginAnalyticsModel"""
    ip_address = models.CharField(max_length=500, null=True, blank=True)
    user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="LoginAnalyticsModel_user"
    )
    login_count = models.IntegerField(default=0)
    device_name = models.CharField(max_length=500, null=True, blank=True)
    token = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        db_table = "LOGIN_ANALYTICS"
        verbose_name = "Login Analytics Model"
        verbose_name_plural = "Login Analytics Model"


class AttachmentModel(CoreGenericModel):
    file = models.FileField(upload_to="attachments/")


class MessageModel(CoreGenericModel):
    message = models.TextField(null=False, blank=True)
    attachments = models.ManyToManyField(
        AttachmentModel,
        blank=True
    )
    created_by = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        null=False,
        blank=True
    )


class ConversationModel(CoreGenericModel):
    user1 = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name="ConversationModel_user1"
    )
    user2 = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name="ConversationModel_user2"
    )
    messages = models.ManyToManyField(
        MessageModel,
        blank=True
    )

class GroupModel(CoreGenericModel):
    group_name = models.CharField(max_length=100)
    users = models.ManyToManyField(
        UserModel,
        blank=True
    )
    messages = models.ManyToManyField(
        MessageModel,
        blank=True
    )

class NotificationsModel(CoreGenericModel):
    id = models.UUIDField(default=uuid.uuid1, unique=True, primary_key=True, editable=False)
    for_user = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="NotificationsModel_for_user"
    )
    message = models.CharField(max_length=512)
    is_read = models.BooleanField(default=False)
    route_data = models.JSONField(null=True, blank=True)
    notification_type = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    # model managers
    objects = models.Manager()

    def __str__(self):
        return str(self.message)


class ExcelDataModel(CoreGenericModel):
    data = models.JSONField(null=True, blank=True)
