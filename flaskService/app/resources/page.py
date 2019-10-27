from flask                  import request
from flask_restful          import Resource
from app.models.page        import Page as PageModel, PageSchema, PageEditorSchema
from app.models.notebook    import Notebook as NotebookModel

page_schema = PageSchema()
page_list_schema = PageSchema(many=True)

page_editor_shema = PageEditorSchema()

class Page(Resource):
    @classmethod
    def get(cls, id: int):
        page = PageModel.find_by_id(id)
        if not page:
            return {'message':'Notebook not found'}, 404
        args = request.args
        if 'mode' in args and args['mode'] == 'editor':
            return page_editor_shema.dump(page), 200
        return page_schema.dump(page), 200
    
    @classmethod
    def put(cls, id: int):
        print('Si entra')
        page = PageModel.find_by_id(id)
        if not page:
            return {'message':'Notebook not found'}, 404
        
        page_json = request.get_json()
        page = page_editor_shema.load(page_json,instance=page)
        page.save_to_db()
        return {"message": "Updated"}, 200

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