from flask                  import request
from flask_restful          import Resource
from app.models.page        import Page as PageModel, PageSchema
from app.models.notebook    import Notebook as NotebookModel

page_schema = PageSchema()
page_list_schema = PageSchema(many=True)

class Page(Resource):
    @classmethod
    def get(cls, id: int):
        page = PageModel.find_by_id(id)
        if not page:
            return {'message':'Notebook not found'}, 404
        return page_schema.dump(page), 200
    
    @classmethod
    def delete(cls, id: int):
        page = PageModel.find_by_id(id)
        if page:
            page.delete_from_db()
            return {"message": "Page deleted"}, 200

        return {"message": "Page not found"}, 404

class Pages(Resource):
    @classmethod
    def get(cls):
        return {"pages": page_list_schema.dump(PageModel.find_all())}, 200
    
    @classmethod
    def post(cls):
        page_json = request.get_json()
        page = page_schema.load(page_json)
        
        page.save_to_db()

        return {'message': 'Page created successfully ', 'data' : page_schema.dump(page)}, 201