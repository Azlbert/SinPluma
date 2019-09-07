from flask                  import Flask
from flask_jwt_extended     import JWTManager
from .resources             import works, user
from .blacklist             import BLACKLIST

app = Flask(__name__, instance_relative_config=True)

app.config.from_object('config.settings')
app.config.from_pyfile('settings.py', silent=True)
app.secret_key = '_eG5+ñ/á}'

app.config["JWT_BLACKLIST_ENABLED"] = True  # enable blacklist feature
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = [
    "access",
    "refresh",
]  # allow blacklisting for access and refresh tokens

jwt = JWTManager(app)

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    return decrypted_token["jti"] in BLACKLIST

app.register_blueprint(works)
app.register_blueprint(user)