from flask                  import request
from flask_restful          import Resource
from app.models.notebook    import Notebook as NotebookModel, NotebookSchema

notebook_schema = NotebookSchema()
notebook_list_schema = NotebookSchema(many=True)

class Notebook(Resource):
    @classmethod
    def get(cls, id: int):
        notebook = NotebookModel.find_by_id(id)
        if not notebook:
            return {'message':'Notebook not found'}, 404
        return notebook_schema.dump(notebook), 200
    

    @classmethod
    def delete(cls, id: int):
        notebook = NotebookModel.find_by_id(id)
        if notebook:
            notebook.delete_from_db()
            return {"message": "Notebook deleted"}, 200

        return {"message": "Notebook not found"}, 404


class Notebooks(Resource):
    @classmethod
    def get(cls):
        return {"notebooks": notebook_list_schema.dump(NotebookModel.find_all())}, 200
    
    @classmethod
    def post(cls):
        notebook_json = request.get_json()
        notebook = notebook_schema.load(notebook_json)
        
        notebook.save_to_db()

        return {'message': 'Notebook created successfully ', 'data' : notebook_schema.dump(notebook)}, 201