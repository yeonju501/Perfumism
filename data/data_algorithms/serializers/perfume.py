from dataclasses import fields
from rest_framework import serializers
from ..models import Brand, Perfume


class PerfumeListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Perfume
        fields = ('perfume_id', 'name', 'image')


class PerfumeSerializer(serializers.ModelSerializer):
    class BrandSerialzer(serializers.ModelSerializer):
        class Meta:
            model = Brand
            fields = '__all__'

    class Meta:
        model = Perfume
        fields = '__all__'