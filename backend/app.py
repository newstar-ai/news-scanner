from flask import Flask, render_template, request
from articles_api.article_routes import article_bp
# from OCR.text_detect import detect_text
import json
import os
import socket

app = Flask(__name__, static_url_path='', static_folder='static', template_folder='templates')
app.register_blueprint(article_bp, url_prefix='/article')

UPLOAD_FOLDER_IMG = os.path.join(app.root_path, "static/img")
app.config['UPLOAD_FOLDER_IMG'] = UPLOAD_FOLDER_IMG
app.config['ROOT_PATH'] = app.root_path
app.config['HOST'] = f'{socket.gethostbyname_ex(socket.gethostname())[-1][-1]}:5000'

@app.route('/')
def hello():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
