from unicodedata import name
from django.shortcuts import render, get_list_or_404, get_object_or_404
from data_algorithms.serializers.brand import BrandSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_algorithms.models import Accord, Member, Perfume
from data_algorithms.serializers.accord import AccordListSerializer, AccordSerializer
from data_algorithms.serializers.perfume import PerfumeListSerializer
from perfumism.settings import AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME,AWS_IMG_DIRECTORY
from .algorithms.dbscan import recommend_like_based, recommend_survey
from .algorithms.wordCloud import word_cloud 
from rest_framework.renderers import JSONRenderer
import boto3


# Create your views here.
@api_view(['GET'])
def like_based(request, member_pk):
    accord_list = []
    member = get_object_or_404(Member, member_id = member_pk)

    perfumes = member.perfume_likes.all()
    for perfume in perfumes:
        accords_temp = perfume.accords.all()
        for accord in accords_temp:
            accord_list.append(accord.eng_name)

    wc_result = word_cloud(accord_list)

    filename = wc_result[0][1:]
    accords = wc_result[1]


    s3r = boto3.resource('s3', aws_access_key_id = AWS_S3_ACCESS_KEY_ID, aws_secret_access_key = AWS_S3_SECRET_ACCESS_KEY)
    data = open(AWS_IMG_DIRECTORY+filename[8:], 'rb')
    s3r.Bucket(AWS_STORAGE_BUCKET_NAME).put_object(Key = filename[8:], Body=data, ContentType='jpg')



    accord_list = ' '.join(accord_list)
    result = recommend_like_based(accord_list)
    perfumes = []
    for i in range(3):
        perfume = get_object_or_404(Perfume, perfume_id = result[i])
        perfumes.append(perfume)

    serializer = PerfumeListSerializer(perfumes, many=True)
    return Response({
        'accords' : accords,
        'filename' : filename,
        'perfume_list' : serializer.data
    })

@api_view(['GET'])
def survey(request, a1, a2, a3, a4, a5):
    answer_list = [a1, a2, a3, a4, a5]
    
    result = recommend_survey(answer_list)
    perfume_list = result[0]
    filename = result[1]
    accords = result[2]
    s3r = boto3.resource('s3', aws_access_key_id = AWS_S3_ACCESS_KEY_ID, aws_secret_access_key = AWS_S3_SECRET_ACCESS_KEY)
    data = open(filename, 'rb')
    s3r.Bucket(AWS_STORAGE_BUCKET_NAME).put_object(Key = 'second', body=data, ContentType='jpg')


    perfumes = []
    for i in range(3):
        perfume = get_object_or_404(Perfume, perfume_id = perfume_list[i])
        perfumes.append(perfume)

    serializer = PerfumeListSerializer(perfumes, many=True)

    return Response({
        'accords' : accords,
        'filename' : filename,
        'perfume_list' : serializer.data
    })