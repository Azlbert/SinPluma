from flask                  import request
from flask_restful          import Resource

class Testing(Resource):
    @classmethod
    def get(cls):
        return {"msg": "testing!"}, 200