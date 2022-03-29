from unicodedata import name
from django.shortcuts import render, get_list_or_404, get_object_or_404
from data_algorithms.serializers.brand import BrandSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_algorithms.models import Accord, Member, Perfume
from data_algorithms.serializers.accord import AccordListSerializer, AccordSerializer
from data_algorithms.serializers.perfume import PerfumeListSerializer
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

    accord_list = ' '.join(accord_list)
    result = recommend_like_based(accord_list)
    perfumes = []
    for i in range(3):
        perfume = get_object_or_404(Perfume, perfume_id = result[i])
        perfumes.append(perfume)

    serializer = PerfumeListSerializer(perfumes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def survey(request, a1, a2, a3, a4, a5):
    answer_list = [a1, a2, a3, a4, a5]

    return Response("")