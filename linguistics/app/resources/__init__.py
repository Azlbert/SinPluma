from flask                  import Blueprint
from flask_restful          import Api
from .sentiment             import SentimentAnalysis, X

analysis_blueprint = Blueprint('sentiment_analysis', __name__)
api = Api(analysis_blueprint)

api.add_resource(SentimentAnalysis, '/sentiment')
api.add_resource(X, '/')