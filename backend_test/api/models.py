from django.db import models
from django.utils.translation import ugettext_lazy as _ 

# Create your models here.
class Newspaper(models.Model):
	title = models.TextField()
	publish_date = models.DateField(null=True)

	def __str__(self):
		return self.title

class Page(models.Model):
	url = models.URLField()
	page_num = models.PositiveIntegerField()
	newspaper = models.ForeignKey('Newspaper', on_delete=models.CASCADE)

class Article(models.Model):
	url = models.URLField()
	page = models.ForeignKey('Page', on_delete=models.CASCADE)
	author = models.TextField(null=True)

class RawPageData(models.Model):
	page = models.OneToOneField('Page', on_delete=models.CASCADE)
	newspaper = models.OneToOneField('Newspaper', on_delete=models.CASCADE)

class RawCropData(models.Model):
	article = models.OneToOneField('Article', on_delete=models.CASCADE)
	page = models.OneToOneField('Page', on_delete=models.CASCADE)
	newspaper = models.OneToOneField('Newspaper', on_delete=models.CASCADE)

class Coordinate(models.Model):
	article = models.ForeignKey('Article', on_delete=models.CASCADE)
	x = models.PositiveIntegerField()
	y = models.PositiveIntegerField()
	w = models.PositiveIntegerField()
	h = models.PositiveIntegerField()

# class Car(models.Model):
#     name = models.CharField(max_length=100)
#     color = models.CharField(max_length=100)
#     manufacturer = models.ForeignKey('Manufacturer', on_delete=models.CASCADE)

# class Manufacturer(models.Model):
#     name = models.CharField(max_length=100)
#     country_code = models.CharField(max_length=2)
#     created = models.DateField()

# class Ad(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField()
#     created = models.DateField(auto_now_add=True)
#     modified = models.DateField(auto_now=True)
#     url = models.URLField()
#     car = models.ForeignKey('Car', related_name='ads', on_delete=models.CASCADE)