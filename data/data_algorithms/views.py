from unicodedata import name
from django.shortcuts import render, get_list_or_404, get_object_or_404
from data_algorithms.serializers.brand import BrandSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_algorithms.models import Accord, Member, Perfume
from data_algorithms.serializers.accord import AccordListSerializer, AccordSerializer
from .algorithms.dbscan import recommend_like_based

# Create your views here.
@api_view(['GET'])
def like_based(request, member_pk):
    accord_list = []
    member = get_object_or_404(Member, member_id = 1)

    perfumes = member.perfume_likes.all()
    for perfume in perfumes:
        accords_temp = perfume.accords.all()
        for accord in accords_temp:
            accord_list.append(accord.eng_name)

    # 어코드 영문 이름 리스트 여기 있습니다 미스터방씨 >> 네
    accord_list = ' '.join(list(set(accord_list)))
    result = recommend_like_based(accord_list)

    serializer = AccordListSerializer(accord_list, many=True)
    return Response(serializer.data)