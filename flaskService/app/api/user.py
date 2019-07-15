from flask          import Blueprint, request
from flask_restful  import Api, Resource, reqparse
from flask_jwt      import jwt_required
#from app.server     import jwt

user = Blueprint('user', __name__)
api = Api(user)

usersList = [
    {'id':1,'name':'Jose'},
    {'id':2,'name':'Pancho'},
    {'id':3,'name':'Juan'}
]

class User(Resource):
    def get(self, id):
        user = next(filter(lambda x: x['id'] == id, usersList), None)   
        if user is not None:
            print("Found")
        return {'item': user}, 200 if user else 404


api.add_resource(User, '/user/<int:id>')
