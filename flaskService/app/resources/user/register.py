from flask_restful          import Resource
from flask                  import request

from app.models.user        import User as UserModel, UserSchema

user_schema = UserSchema()

class UserRegister(Resource):
    def post(self):
        user_json = request.get_json()
        user = user_schema.load(user_json)
        
        if UserModel.find_by_username(user.user_name):
            return {"message": "User exists"}, 400

        user.save_to_db()

        return {'message': 'User created successfully ', 'data' : user_schema.dump(user)}, 201