from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
from .serializer import ArticleSerializer
# Create your views here.

class NewspaperAPIView(APIView):
	def get(self, request, pk, format=None):
		newspaper = get_object_or_404()

class ArticleAPIView(APIView):
	'''Add new article'''
	def post(self, request, format=None):
		atc_serializer = ArticleSerializer(data=request.data)