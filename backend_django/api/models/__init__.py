from django.db import models

# Create your models here.
class Publication(models.Model):
	title = models.TextField()
	publish_date = models.DateField()

	def __str__(self):
		return self.title

class Page(models.Model):
	url = models.URLField()
	page_num = models.PositiveIntegerField(null=True, blank=True)
	publication = models.ForeignKey('Publication', on_delete=models.CASCADE)

class Article(models.Model):
	url = models.URLField()
	author = models.TextField(null=True, blank=True)
	content = models.TextField(null=True, blank=True)
	coordinate = models.ForeignKey('Coordinate', on_delete=models.CASCADE, null=True, blank=True)
	page = models.ForeignKey('Page', on_delete=models.CASCADE, null=True)
	publication = models.ForeignKey('Publication', on_delete=models.CASCADE)

class RawPageData(models.Model):
	page = models.OneToOneField('Page', on_delete=models.CASCADE)
	publication = models.OneToOneField('Publication', on_delete=models.CASCADE)
	isActive = models.BooleanField(default=False)

class RawCropData(models.Model):
	article = models.OneToOneField('Article', on_delete=models.CASCADE)
	page = models.OneToOneField('Page', on_delete=models.CASCADE)
	publication = models.OneToOneField('Publication', on_delete=models.CASCADE)
	isActive = models.BooleanField(default=False)

class Coordinate(models.Model):
	x = models.PositiveIntegerField()
	y = models.PositiveIntegerField()
	w = models.PositiveIntegerField()
	h = models.PositiveIntegerField()
