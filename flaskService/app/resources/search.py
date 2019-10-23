from flask                  import request
from flask_restful          import Resource
from app.models.notebook    import Notebook as NotebookModel, NotebookSchema
from app.models.page        import Page as PageModel, PageSchema

notebook_schema = NotebookSchema()
notebook_list_schema = NotebookSchema(many=True)

class SearchNotebooks(Resource):
    @classmethod
    def get(cls, query: str):
        return {"notebooks": notebook_list_schema.dump(NotebookModel.find(query))}, 200