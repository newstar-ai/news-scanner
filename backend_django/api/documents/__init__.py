from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry 
from ..models import Publication, Page, Article, RawPageData, RawCropData
# from .models import Car, Manufacturer, Ad

# @registry.register_document
# class RawPageDataDocument(Document):
# 	page = fields.ObjectField(properties={
# 			'url': fields.TextField()	
# 		})
# 	publication = fields.ObjectField(properties={
# 			'title': fields.TextField(),
# 			'publish_date': fields.DateField()
# 		})

# 	class Index:
# 		name = 'raw-pages-index'

# 	class Django:
# 		model = RawPageData
# 		fields = []
# 		related_models = [Page, Publication]

# @registry.register_document
# class RawCropDataDocument(Document):
# 	article = fields.ObjectField(properties={
# 			'url': fields.TextField(),
# 			'coordinate': fields.ObjectField(properties={
# 					'x': fields.IntegerField(),
# 					'y': fields.IntegerField(),
# 					'w': fields.IntegerField(),
# 					'h': fields.IntegerField()
# 				})
# 		})

# 	page = fields.ObjectField(properties={
# 			'url': fields.TextField()
# 		})

# 	publication = fields.ObjectField(properties={
# 			"title": fields.TextField(),
# 			"publish_date": fields.DateField()
# 		})

# 	class Index:
# 		name = "raw-crop-index"

# 	class Django:
# 		model = RawCropData
# 		fields = []
# 		related_models = [Article, Page, Publication]

@registry.register_document
class ArticleDocument(Document):
	article = fields.ObjectField(properties={
			'url': fields.TextField(),
			'author': fields.TextField(),
			'content': fields.TextField(),
			'cordinate': fields.ObjectField(properties={
					'x': fields.IntegerField(),
					'y': fields.IntegerField(),
					'w': fields.IntegerField(),
					'h': fields.IntegerField()
				})
		})

	page = fields.ObjectField(properties={
			'url': fields.TextField(),
			'page_num': fields.IntegerField()
		})

	publication = fields.ObjectField(properties={
			"title": fields.TextField(),
			"publish_date": fields.DateField()
		})

	class Index:
		name = 'article-index'

	class Django:
		model = Article 
		fields = []
		related_models = [Article, Page, Publication]

# @registry.register_document
# class PublicationDocument(Document):
# 	class Index:
# 		name = 'publication-index'

# 	class Django:
# 		model = Publication
# 		fields = [
# 			'title'
# 		]

# @registry.register_document
# class CarDocument(Document):
#     manufacturer = fields.ObjectField(properties={
#         'name': fields.TextField(),
#         'country_code': fields.TextField(),
#     })
#     ads = fields.NestedField(properties={
#         'description': fields.TextField(),
#         'title': fields.TextField(),
#         'pk': fields.IntegerField(),
#     })

#     class Index:
#         name = 'cars'

#     class Django:
#         model = Car
#         fields = [
#             'name',
#             'color',
#         ]
#         related_models = [Manufacturer, Ad]  # Optional: to ensure the Car will be re-saved when Manufacturer or Ad is updated

#     def get_queryset(self):
#         """Not mandatory but to improve performance we can select related in one sql request"""
#         return super(CarDocument, self).get_queryset().select_related(
#             'manufacturer'
#         )

#     def get_instances_from_related(self, related_instance):
#         """If related_models is set, define how to retrieve the Car instance(s) from the related model.
#         The related_models option should be used with caution because it can lead in the index
#         to the updating of a lot of items.
#         """
#         if isinstance(related_instance, Manufacturer):
#             return related_instance.car_set.all()
#         elif isinstance(related_instance, Ad):
#             return related_instance.car