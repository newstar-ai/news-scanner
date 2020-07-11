from flask import Flask, render_template, request
from articles_api.article_routes import article_bp
# from OCR.text_detect import detect_text
import json

app = Flask(__name__)
app.register_blueprint(article_bp, url_prefix='/article')

@app.route('/')
def hello():
    return render_template('index.html')

# @app.route('/detect_text', methods=['POST'])
# def predict():
#     img = request.files['img']
#     data = detect_text(img)
#     data = 
#     json_file = json.dumps(data, ensure_ascii=False, indent=4)
#     return json_file

if __name__ == '__main__':
    app.run(debug=True)