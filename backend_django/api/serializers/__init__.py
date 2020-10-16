import json 

from rest_framework import serializers

from ..models import Publication, Page, Article, RawPageData, RawCropData, Coordinate

class PublicationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Publication
		fields = '__all__'

class PageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Page
		fields = ('url', 'page_num')

class CoordinateSerializer(serializers.ModelSerializer):
	class Meta:
		model = Coordinate
		fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):
	coordinate = CoordinateSerializer(required=False)
	class Meta:
		model = Article
		fields = ('coordinate', 'url', 'author', 'content', 'page', 'publication')

class RawPageSerializer(serializers.ModelSerializer):
	page = PageSerializer(required=True)
	publication = PublicationSerializer(required=True)
	class Meta: 
		model = RawPageData
		fields = ('page', 'publication')

	def create(self, validated_data):
		page_data = validated_data.pop('page')
		publication_data = validated_data.pop('publication')

		publication = Publication.objects.create(**publication_data)
		page = Page.objects.create(**page_data, publication=publication)

		raw_page_data = RawPageData(page=page, publication=publication)

		return raw_page_data


class RawCropSerializer(serializers.ModelSerializer):
	article = ArticleSerializer(required=True)
	page = PageSerializer(required=True)
	publication = PublicationSerializer(required=True)
	class Meta:
		model = RawCropData
		fields = ('article', 'page', 'publication')