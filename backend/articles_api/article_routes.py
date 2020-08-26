from flask import Blueprint, request, jsonify, current_app, url_for 
from OCR.text_detect import detect_text
from .utils import *
from .schemas import *
from elasticsearch.exceptions import NotFoundError
from werkzeug.utils import secure_filename

import json
import uuid

article_bp = Blueprint('article_blueprint', __name__)

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

dev_mode = False


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Convert text from img
@article_bp.route('/convert_text', methods=['GET', 'POST'])
def predict():
    if 'img' not in request.files:
        result = jsonify({'message': 'No image part in the request'})
        result.status_code = 400
        return result
    # Request image file
    img = request.files['img']
    # Process image of an article
    if img and allowed_file(img.filename):
        # filename = secure_filename(img.filename)
        filename = str(uuid.uuid4().hex) + '.' + img.filename.rsplit('.', 1)[1].lower()
        out_path_url, img_url = save_image_upload(current_app, img, filename)
        
        data = {}
        data['img_url'] = img_url
        data['local_url'] = out_path_url
        # data['image_name'] = filename
        # data['paper_name'] = request.form["paper_name"]
        # data['publication'] = request.form["publication"]
        # data['page_num'] = request.form["page_num"]

        if dev_mode == False:
            ai_data = detect_text(out_path_url)
        else:
            ai_data = {"article_title": "Development Title",
                       "article_content": "Development Content"}
        data.update(ai_data)
        result = json.dumps(data, ensure_ascii=False, indent=4)
    # Not an image file
    else:
        result = jsonify({'message': 'File extension is not allowed or no image has been selected'})
        result.status_code = 400
    return result

# Search_article_by title


@article_bp.route('/search/title', methods=['POST'])
def search_atcl_by_title():
    data_search = request.json
    search_field = "article_title"
    if validateArticleData(data_search, article_search_title_schema):
        body_search = search_atcl_querry(search_field, data_search['title'], data_search['start_date'], data_search['end_date'])
        data_result = es.search(index=newspaper_index, body=body_search)

    else:
        data_result = {
            "message": "Search failed, check you parsing data again"
        }
    data_result = json.dumps(data_result, ensure_ascii=False, indent=4)
    return data_result

# Search_article_by author


@article_bp.route('/search/author', methods=['POST'])
def search_atcl_by_author():
    data_search = request.json
    search_field = "article_author"
    if validateArticleData(data_search, article_search_author_schema):
        body_search = search_atcl_querry(search_field, data_search['author'], data_search['start_date'], data_search['end_date'])
        data_result = es.search(index=newspaper_index, body=body_search)

    else:
        data_result = {
            "message": "Search failed, check you parsing data again"
        }
    data_result = json.dumps(data_result, ensure_ascii=False, indent=4)
    return data_result

# Search_article_by content


@article_bp.route('/search/content', methods=['POST'])
def search_atcl_by_content():
    data_search = request.json
    search_field = "article_content"
    if validateArticleData(data_search, article_search_content_schema):
        body_search = search_atcl_querry(search_field, data_search['content'], data_search['start_date'], data_search['end_date'])
        data_result = es.search(index=newspaper_index, body=body_search)

    else:
        data_result = {
            "message": "Search failed, check you parsing data again"
        }
    data_result = json.dumps(data_result, ensure_ascii=False, indent=4)
    return data_result

# Get article from id


@article_bp.route('/get/<atcl_id>', methods=['GET'])
def get_article(atcl_id):
    try:
        data = es.get(index=newspaper_index, id=atcl_id)['_source']
        data = json.dumps(data, ensure_ascii=False)
    except NotFoundError as nf_err:
        message = {
            "article_id": atcl_id,
            "message_error": "article is not exist"
        }
        data = jsonify(message)
        data.status_code = 400
    return data


# Update article from id
'''
data parse must be something like this
{
    "title": "new",
    "author": "new",
    "content": "new"
}
'''


@article_bp.route('/update/<atcl_id>', methods=['POST'])
def update_article(atcl_id):
    data = request.json
    if validateArticleData(data, article_update_schema):
        es.update(
            index=newspaper_index,
            id=atcl_id,
            body={
                "script": {
                    "source": "ctx._source.article_info.article_title=params.Title;\
                               ctx._source.article_info.article_author=params.author;\
                               ctx._source.article_info.article_content=params.content",
                    "lang": "painless",
                    "params": {
                        "title": data['title'],
                        "author": data['author'],
                        "content": data['content']
                    }
                }
            }
        )
        result = "update sucess!"
    else:
        result = "update failed, check your data and update again"
    result_response = {
        "message": result
    }
    return json.dumps(result_response)


# Upload article id
'''
data parse must be something like this
{
    "article_info": {
        "article_title": "title 4",
        "article_author": "author 4",
        "article_content": "content 4",
        "article_url_local": "/data/img/on/local",
        "article_url_web": "http://serverhost/example/path",
    },
    "publication_info": {
        "publish_date": "dd-mm-yyyyy",
        "page_num": 12
    },
    "newspaper_info": {
        "newspaper_title": "hoho"
    }
}
'''
@article_bp.route('/upload/', methods=['POST'])
def upload_article():
    data = request.json
    if validateArticleData(data, article_upload_schema):
        es.index(index=newspaper_index, body=data)
        result = "upload sucess!"
    else:
        result = "upload failed, check your data and upload again"

    result_response = {
        "message": result
    }
    return json.dumps(result_response)

#Get all article data 
@article_bp.route('/get_all', methods=['GET'])
def get_all():
    result = es.search(index=newspaper_index, body={"query": {"match_all": {}}})
    result = json.dumps(result)

    return result