# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Accord(models.Model):
    accord_id = models.BigAutoField(primary_key=True)
    kor_name = models.CharField(max_length=100)
    eng_name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'accord'


class Article(models.Model):
    article_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    content = models.TextField()
    subject = models.CharField(max_length=255)
    title = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'article'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Brand(models.Model):
    brand_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'brand'


class Category(models.Model):
    category_id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'category'


class CategoryAccord(models.Model):
    category_accord_id = models.BigAutoField(primary_key=True)
    category_id = models.BigIntegerField()
    accord_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'category_accord'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Member(models.Model):
    member_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    authority = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=50)
    gender = models.IntegerField(blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'member'


class Perfume(models.Model):
    perfume_id = models.BigIntegerField(primary_key=True)
    brand_id = models.BigIntegerField()
    name = models.CharField(max_length=100)
    image = models.CharField(max_length=255)
    launch_year = models.IntegerField(blank=True, null=True)
    average_grade = models.FloatField(blank=True, null=True)
    top_notes = models.CharField(max_length=500, blank=True, null=True)
    middle_notes = models.CharField(max_length=255, blank=True, null=True)
    base_notes = models.CharField(max_length=255, blank=True, null=True)
    total_survey = models.IntegerField(blank=True, null=True)
    total_like = models.IntegerField(blank=True, null=True)
    longevity = models.CharField(max_length=100, blank=True, null=True)
    sillage = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'perfume'


class PerfumeAccord(models.Model):
    perfume_accord_id = models.BigAutoField(primary_key=True)
    perfume_id = models.BigIntegerField()
    accord_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'perfume_accord'


class RefreshToken(models.Model):
    email = models.CharField(primary_key=True, max_length=255)
    token = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'refresh_token'


class Review(models.Model):
    review_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    grade = models.IntegerField(blank=True, null=True)
    member_id = models.BigIntegerField(blank=True, null=True)
    perfume_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class SimilarPerfume(models.Model):
    similar_perfume_id = models.BigAutoField(primary_key=True)
    origin_id = models.BigIntegerField()
    similar_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'similar_perfume'
