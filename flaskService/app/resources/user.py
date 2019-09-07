from flask                  import Blueprint, request
from flask_restful          import Api, Resource, reqparse
from flask_jwt_extended     import (
    create_access_token, 
    create_refresh_token,
    jwt_refresh_token_required,
    get_jwt_identity,
    fresh_jwt_required,
    jwt_required,
    get_raw_jwt
)
from werkzeug.security      import safe_str_cmp

from app.models             import user_model
from app.blacklist          import BLACKLIST
#from app.server     import jwt

user = Blueprint('user', __name__)
api = Api(user)

class User(Resource):
    @classmethod
    def get(self, id):
        user = user_model.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 200
        return user, 200


_user_parser = reqparse.RequestParser()
_user_parser.add_argument(
    'username',
    type = str,
    required = True,
    help = 'This field cannot be blank'
)
_user_parser.add_argument(
    'password',
    type = str,
    required = True,
    help = 'This field cannot be blank'
)

class UserRegister(Resource):
    def post(self):
        data = _user_parser.parse_args()

        if user_model.find_by_username(data['username']):
            return {"message": "A user with that username already exist"}, 400
        
        user = user_model(**data)

        user_model.add_user(user)

        return {'message': 'User created successfully'}, 201

class UserLogin(Resource):
    @classmethod
    def post(cls):
        # get data from parser
        data = _user_parser.parse_args()
        

        # find user in database
        user = user_model.find_by_username(data['username'])

        # check password
        # create access token
        # create refresh token
        # return them
        if user and safe_str_cmp(user['password'], data['password']):
            access_token =  create_access_token(identity = user['id'], fresh = True)
            refresh_token = create_refresh_token(identity = user['id'])

            return {
                'access_token'  : access_token,
                'refresh_token' : refresh_token
            }, 200
        
        return {'message' : 'Invalid credentials'}, 401

class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity = current_user, fresh = False)
        return {'access_token' : new_token}, 200

class UserLogout(Resource):
    @classmethod
    @jwt_required
    def post(cls):
        jti = get_raw_jwt()["jti"]  # jti is "JWT ID", a unique identifier for a JWT.
        user_id = get_jwt_identity()
        BLACKLIST.add(jti)
        return {"message": "U had logout " + str(user_id)}, 200

api.add_resource(User, '/user/<int:id>')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(TokenRefresh, '/refresh')
