#pylint: disable=unused-variable
from flask                  import Flask

app = None

def create_app():
    global app
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('config.settings')
    app.config.from_pyfile('settings.py', silent=True)
    app.secret_key = '_eG5+ñ/á}'

    with app.app_context():
        from .resources             import test_blueprint
        app.register_blueprint(test_blueprint)
        
        print("--- App created ---")
        return app
