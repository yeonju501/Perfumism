from dataclasses import fields
from rest_framework import serializers
from ..models import Accord, Perfume

class AccordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accord
        fields = '__all__'

        
class AccordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Accord
        fields = '__all__'