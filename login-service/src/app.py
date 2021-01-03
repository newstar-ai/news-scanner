import flask
import os 
import flask_login
import models.Users as Users
from models.Connection import Connection
from response.Response import Response

from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.secret_key = 'superapp@123'
app.config.from_pyfile("env/dev.env")

connection = Connection(
    app.config.get("DATABASE_DATABASE"), 
    app.config.get("DATABASE_USER"), 
    app.config.get("DATABASE_PASSWORD"), 
    app.config.get("DATABASE_HOST"),
    app.config.get("DATABASE_PORT")
)

login_manager = flask_login.LoginManager()
login_manager.init_app(app)


@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return

    user = User()
    user.id = email

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = request.form['password'] == users[email]['password']

    return user


@app.route('/login', methods=["POST"])
@cross_origin()
def login():
    user = flask.request.json.get("username")
    password = flask.request.json.get("password")

    status, body = connection.get_user(user, password)
    response = Response(status, body)

    return response.get_res()

@app.route("/api/user/create", methods=["POST"])
def create_user():
    username = flask.request.json.get("username")
    password = flask.request.json.get("password")

    status, body = connection.create_user(username, password)
    response = Response(status, body)

    return response.get_res()

@app.route("/api/user/update", methods=["POST"])
def update_user():
    username = flask.request.json.get("username")
    password = flask.request.json.get("password")

    status, body = connection.update_user(username, password)
    response = Response(status, body)

    return response.get_res()


@app.route('/protected')
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.id



@app.route('/logout')
def logout():
    flask_login.logout_user()
    return 'Logged out'


@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'

if __name__ == "__main__":
    app.run(debug=True)