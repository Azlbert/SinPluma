from flask                  import request
from flask_restful          import Resource
from app.models.user        import User as UserModel, UserSchema
from app.models.notebook    import Notebook as NotebookModel, NotebookSchema
from app.models.reading     import Reading as ReadingModel, ReadingSchema, ReadingNotebookSchema
from flask_jwt_extended     import (
    jwt_required
)

user_schema = UserSchema()
notebook_list_schema = NotebookSchema(many=True)
reading_list_schema = ReadingSchema(many=True)
reading_notebook_list_schema = ReadingNotebookSchema(many=True)

class User(Resource):
    @classmethod
    def get(cls, id):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 400
        return user_schema.dump(user), 200

class UserNotebooks(Resource):
    @classmethod
    def get(cls,id):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 400
        return {"notebooks": notebook_list_schema.dump(NotebookModel.find_all_by_user(id))}, 200

class UserReadings(Resource):
    @classmethod
    def get(cls, id:int):
        user = UserModel.find_by_id(id)
        if not user:
            return {'message':'User not found'}, 400
        #reading_list = reading_list_schema.dump(ReadingModel.find_user_list(id, include_notebook_info=True))
        reading_list = ReadingModel.find_user_list(id, include_notebook_info=True)
        return {"readings": reading_notebook_list_schema.dump(reading_list)}, 200
