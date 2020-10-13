import json 

from rest_framework import serializers

from .models import Newspaper, Page, Article, RawPageData, RawCropData, Coordinate

class NewspaperSerializer(serializers.ModelSerializer):
	class Meta:
		model = Newspaper
		fields = '__all__'

class PageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Page
		fields = '__all__'

class CoordinateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coordinate
		fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
	class Meta:
		model = Article
		fields = '__all__'

class RawPageSerializer(serializers.ModelSerializer):
	class Meta: 
		model = RawPageData
		fields = '__all__'

class RawCropSerializer(serializers.ModelSerializer):
	class Meta:
		model = RawCropData
		fields = '__all__'