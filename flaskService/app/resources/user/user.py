from flask_restful          import Resource
from app.models.user        import User as UserModel, UserSchema
from app.models.notebook    import Notebook as NotebookModel, NotebookSchema

user_schema = UserSchema()
notebook_list_schema = NotebookSchema(many=True)

class User(Resource):
    @classmethod
    def get(cls, id):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 200
        return user_schema.dump(user), 200

class UserNotebooks(Resource):
    @classmethod
    def get(cls,id):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 200
        return {"notebooks": notebook_list_schema.dump(NotebookModel.find_all_by_user(id))}, 200
