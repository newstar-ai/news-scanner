from elasticsearch import Elasticsearch as ES
from jsonschema import validate
from jsonschema.exceptions import ValidationError as VEJ
from pathlib import Path 
from datetime import date 

import os

es = ES([{'host':'10.2.50.231', 'port': 9200}])
newspaper_index = 'newspaper-data'

def validateArticleData(jsonData, schema_type):
    '''
    Return json data request whether validate or not
    @param jsonData: json data requested
    @param schemaType: model of schema 
    '''
    try: 
        validate(instance=jsonData, schema=schema_type)
    except VEJ as err: 
        return False 
    return True


def search_atcl_query(field_search, keyword_must, keyword_should, start_date, end_date):
    '''
    This function return query body to make a search request to Elasticsearch system 
    @param field_search: json object define desire search field s
    @param keyword_must:  words the search must include
	@param keyword_should: words the search should include 
    @param start_date: 
    @param end_date:

    For example 
    {
      "query": {
        "bool": {
          "must": [
            {
              "dis_max": {
                "queries": [
                    {"match_phrase": {"article_info.article_author": "Hà"}},
                    {"match_phrase": {"article_info.article_content": "Hà"}}
                  ]
              }
            },
            {
              "range": {
                "publication_info.publish_date": {
                  "gte": "2020-05-01",
                  "lte": "2020-05-30"
                }
              }
            }
          ]
		  "should": [
			  {
				  "dis_max": {
					  "queries": [

					  ]
				  }
			  }
		  ]
        }
      }
    }
    '''
    must_queries = [] # Array of desire search fields
	should_queries = []

    for field in field_search:
        if field_search[field]: 
            phrase = {
                "match_phrase": {f"article_info.article_{field}": keyword_must}
            }
            must_queries.append(phrase)

	for field in field_search:
		if field_search[field]:
			phrase = {
				"match_phrase": {f"article_info.article_{field}": keyword_should}
			}
			should_queries.append(phrase)

    query_body = {
        "query": {
            "bool": {
                "must": [
                    {
                        "dis_max": {
                            "queries": must_queries
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
				"should":[
					{
						"dis_max": {
							"queries": should_queries
						}
					}
				]
            }
        }
    }
    return query_body

def save_image_upload(current_app, img, filename):
    '''
    Saving any upload image to server
    @param current_app: flask object to get environment variable
    @param img: image content 
    @param filename: name of the image
    '''
    # Make directory
    today_date = date.today().strftime('%Y-%b-%d')
    directory_name = current_app.config['UPLOAD_FOLDER_IMG']
    today_date_folder = os.path.join(directory_name, today_date)
    Path(f'{today_date_folder}').mkdir(parents=True, exist_ok=True)

    # Save image on local server
    static_img_folder = current_app.config['UPLOAD_FOLDER_IMG']
    host_url = current_app.config['HOST']
    outpath_img = os.path.join(static_img_folder, today_date, filename)
    img.save(outpath_img)
    image_url = os.path.join(host_url, 'img', today_date, filename) # Provide url on host for that image
    
    # Path on folder could be related to os type
    if os.name == 'nt': 
        outpath_img = outpath_img.replace("\\", "/")
        image_url = image_url.replace("\\", "/")
    return outpath_img, image_url

def noncase_partition(text, keyword_must):
    '''
    Find matching keyword_must, divide text into 3 parts
    - previous matching word
    - marching word
    - post matching word
    @param text: sentence to handle
    @param keyword_must: 
    '''
    ltext = text.lower()
    lkeyword_must = keyword_must.lower()
    ind = ltext.find(lkeyword_must)
    keyword_must_len = len(lkeyword_must)
    return (text[:ind], text[ind:ind+keyword_must_len], text[ind+keyword_must_len:])

def get_show_content(content, keyword_must, search_content, limited_words=100):
    '''
    return shortened content started with keyword_must from article content if searching by content is requested
    else return begining limited_word of the content
    @param content: article content
    @param keyword_must: 
    @param search_content: equal to true if searching by content is requested
    @param limited_words: 
    '''
    if search_content:
        pre_kw, kw, post_kw = noncase_partition(content, keyword_must)
        words = (kw + post_kw).split()
        if not words: words = pre_kw.split() # No keyword_must is found
    else: words = content.split()
    
    limited_words = limited_words if len(words) >= limited_words else len(words)
    result = " ".join(words[:limited_words])

    return result