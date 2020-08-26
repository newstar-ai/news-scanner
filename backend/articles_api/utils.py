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
			"match_phrase": {
				f"article_info.{field}": data_search
			}
		}
	}
	return query

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