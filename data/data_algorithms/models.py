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
    category = models.ForeignKey(Category, models.DO_NOTHING)
    accord = models.ForeignKey(Accord, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'category_accord'


class Perfume(models.Model):
    perfume_id = models.BigIntegerField(primary_key=True)
    brand = models.ForeignKey(Brand, on_delete = models.DO_NOTHING)
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
    accords = models.ManyToManyField(Accord, through='PerfumeAccord', through_fields=('perfume', 'accord'), related_name='accords')

    class Meta:
        managed = False
        db_table = 'perfume'


class PerfumeAccord(models.Model):
    perfume_accord_id = models.BigAutoField(primary_key=True)
    perfume = models.ForeignKey(Perfume, on_delete = models.DO_NOTHING)
    accord = models.ForeignKey(Accord, on_delete = models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'perfume_accord'


class Member(models.Model):
    member_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    authority = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=50)
    gender = models.IntegerField(blank=True, null=True)
    image = models.CharField(max_length=255, blank=True, null=True)
    kakao_id = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=20)
    perfume_likes = models.ManyToManyField(Perfume, through='PerfumeLike', through_fields=('member', 'perfume'), related_name='perfume_likes')

    class Meta:
        managed = False
        db_table = 'member'


class PerfumeLike(models.Model):
    perfume_like_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    member = models.ForeignKey(Member, on_delete = models.DO_NOTHING)
    perfume = models.ForeignKey(Perfume, on_delete = models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'perfume_like'


class RefreshToken(models.Model):
    refresh_token_id = models.BigAutoField(primary_key=True)
    email = models.CharField(max_length=255, blank=True, null=True)
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
    total_like = models.IntegerField(blank=True, null=True)
    member_id = models.BigIntegerField(blank=True, null=True)
    perfume_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review'


class ReviewLike(models.Model):
    review_like_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField()
    deleted_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    member_id = models.BigIntegerField(blank=True, null=True)
    review_id = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'review_like'


class SimilarPerfume(models.Model):
    similar_perfume_id = models.BigAutoField(primary_key=True)
    origin = models.ForeignKey(Perfume, on_delete = models.DO_NOTHING, related_name= 'origin_set')
    similar = models.ForeignKey(Perfume, on_delete = models.DO_NOTHING, related_name='similar_set')

    class Meta:
        managed = False
        db_table = 'similar_perfume'
