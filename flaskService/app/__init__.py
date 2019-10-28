#pylint: disable=unused-variable
from flask                  import Flask, jsonify
from flask_sqlalchemy       import SQLAlchemy
from flask_jwt_extended     import JWTManager
from flask_marshmallow      import Marshmallow
from marshmallow            import ValidationError
from .blacklist             import BLACKLIST

db = SQLAlchemy()
ma = Marshmallow()

def create_app():
    print('--- Creating app ---')
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)
    app.secret_key = '_eG5+ñ/á}'

    db.init_app(app)
    ma.init_app(app)
    
    jwt = JWTManager(app)

    @jwt.user_claims_loader
    def add_claims_to_access_token(identity):
        from .models.user import User as UserModel
        user = UserModel.find_by_id(identity)
        return {
            'id':user.user_id,
            'fname': user.first_name,
            'lname': user.last_name,
        }
    
    @app.errorhandler(ValidationError)
    def handle_marshmallow_validation(err):
        return jsonify(err.messages), 400
    
    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        return decrypted_token["jti"] in BLACKLIST

    with app.app_context():
        from .resources.user        import user_blueprint
        from .resources             import notebook_blueprint
        from .sentimet              import sentiment_blueprint
        app.register_blueprint(user_blueprint)
        app.register_blueprint(notebook_blueprint)
        app.register_blueprint(sentiment_blueprint)
        
        print("--- App created ---")
        return app
