from elasticsearch import Elasticsearch as ES
from jsonschema import validate
from jsonschema.exceptions import ValidationError as VEJ
from pathlib import Path 
from datetime import date 

import os

es = ES([{'host':'10.2.50.231', 'port': 9200}])
newspaper_index = 'newspaper-data'

def validateArticleData(jsonData, schema_type):
	try: 
		validate(instance=jsonData, schema=schema_type)
	except VEJ as err: 
		return False 
	return True

def search_atcl_querry(field, data_search, start_date, end_date):
	query = {
		"query": {
			"bool": {
				"must": [
					{
						"match_phrase": {f"article_info.{field}": data_search}
					},
					{
						"range": {
							"publication_info.publish_date": {
								"gte": start_date,
								"lte": end_date
							}
						}
					}
				]
			}
		}
	}
	return query

def search_atcl_query_option(field_search, keyword, start_date, end_date):
	queries = []
	for field in field_search:
		if field_search[field]: 
			phrase = {
				"match_phrase_prefix": {f"article_info.article_{field}": keyword}
			}
			queries.append(phrase)
	query_body = {
		"query": {
			"bool": {
				"must": [
					{
						"dis_max": {
							"queries": queries
						}
					},
					{
						"range": {
							"publication_info.publish_date": {
								"gte": start_date,
								"lte": end_date
							}
						}
					}
				]
			}
		}
	}
	return query_body

def save_image_upload(current_app, img, filename):
	# Make directory
	today_date = date.today().strftime('%Y-%b-%d')
	today_date_folder = os.path.join(current_app.config['UPLOAD_FOLDER_IMG'], today_date)
	Path(f'{today_date_folder}').mkdir(parents=True, exist_ok=True)

	outpath_img = os.path.join(current_app.config['UPLOAD_FOLDER_IMG'], today_date, filename)
	image_url = os.path.join(current_app.config['HOST'], 'img', today_date, filename)
	img.save(outpath_img)
	if os.name == 'nt':
		outpath_img = outpath_img.replace("\\", "/")
		image_url = image_url.replace("\\", "/")
	return outpath_img, image_url

def case_partition(text, sep):
    ltext = text.lower()
    lsep = sep.lower()
    ind = ltext.find(lsep)
    seplen = len(lsep)
    return (text[:ind], text[ind:ind+seplen], text[ind+seplen:])

def get_show_content(content, keyword, search_content, words_get=100):
	if search_content:
		pre_kw, kw, post_kw = case_partition(content, keyword)
		words = (kw + post_kw).split()
		if not words: words = pre_kw.split() #No keyword is found
	else: words = content.split()
	
	words_get = words_get if len(words) >= words_get else len(words)
	result = " ".join(words[:words_get])

	return result