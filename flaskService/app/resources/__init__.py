from flask                  import Blueprint
from flask_restful          import Api
from .genre                 import Genre, Genres
from .notebook              import NotebookPage, Notebook, Notebooks
from .page                  import Page, Pages

notebook_blueprint = Blueprint('notebook', __name__)
api = Api(notebook_blueprint)

api.add_resource(Genre, '/genres/<string:name>')
api.add_resource(Genres, '/genres/')
api.add_resource(NotebookPage, '/notebooks/<int:id>/pages/')
api.add_resource(Notebook, '/notebooks/<int:id>')
api.add_resource(Notebooks, '/notebooks/')
api.add_resource(Page,  '/pages/<int:id>')
api.add_resource(Pages, '/pages/')