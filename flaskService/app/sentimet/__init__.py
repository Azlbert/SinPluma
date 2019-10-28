from flask                  import Blueprint
from flask_restful          import Api
from .analysis              import Analysis

sentiment_blueprint = Blueprint('sentiment', __name__)
api = Api(sentiment_blueprint)

api.add_resource(Analysis, '/sentiment/')