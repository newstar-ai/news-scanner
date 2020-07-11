from flask import Blueprint
# from OCR.text_detect import detect_text

import json 

article_bp = Blueprint('article_blueprint', __name__)

@article_bp.route('/convert_text', methods=['GET', 'POST'])
def predict():
    # img = request.files['img']
    # data = detect_text(img)
    data = {
    	'Title': 'fake title',
    	'Texts': 'fake content'
    }
    data = json.dumps(data, ensure_ascii=False, indent=4)
    return data
