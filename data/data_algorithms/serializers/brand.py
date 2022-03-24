from dataclasses import fields
from rest_framework import serializers
from ..models import Brand, Perfume

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'