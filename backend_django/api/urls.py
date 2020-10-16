from django.urls import re_path

from .views import (
	RawPageDataDetail, RawPageDataList
)

urlpatterns = [
	re_path(r'raw_page_data\/?', RawPageDataList.as_view()),
	re_path(r'raw_page_data/<int:pk>\/?', RawPageDataDetail.as_view())
]