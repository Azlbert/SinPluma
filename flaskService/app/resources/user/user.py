from flask_restful          import Resource
from app.models.user        import User as UserModel, UserSchema

user_schema = UserSchema()

print("--- From User Resource ---")
class User(Resource):
    @classmethod
    def get(cls, id):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 200
        return user_schema.dump(user), 200