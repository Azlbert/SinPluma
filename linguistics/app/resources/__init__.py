from flask                  import Blueprint
from flask_restful          import Api
from .test                  import Testing

test_blueprint = Blueprint('test', __name__)
api = Api(test_blueprint)

api.add_resource(Testing, '/')