from flask          import Flask
from flask_jwt      import JWT
from app.resources  import works, user
from .security      import authenticate, identity, security_key

app = Flask(__name__, instance_relative_config=True)

app.config.from_object('config.settings')
app.config.from_pyfile('settings.py', silent=True)
app.secret_key = security_key


jwt = JWT(app, authenticate, identity) #auth
app.register_blueprint(works)
app.register_blueprint(user)