from elasticsearch import Elasticsearch as ES
from jsonschema import validate
from jsonschema.exceptions import ValidationError as VEJ

es = ES([{'host':'10.2.50.231', 'port': 9200}])
newspaper_index = 'newspaper-data'

def validateArticleData(jsonData, schema_type):
	try: 
		validate(instance=jsonData, schema=schema_type)
	except VEJ as err: 
		return False 
	return True

def search_atcl_querry(field, data_search):
	query = {
		"query": {
			"match": {
				f"article_info.{field}": data_search
			}
		}
	}