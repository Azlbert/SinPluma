from flask                  import Blueprint
from flask_restful          import Api
from .genre                 import Genre, Genres
from .notebook              import NotebookPage, Notebook, Notebooks, NotebookImage
from .page                  import Page, Pages
from .search                import SearchNotebooks
from .reading               import Reading, PostReading

notebook_blueprint = Blueprint('notebook', __name__)
api = Api(notebook_blueprint)

api.add_resource(Genre, '/genres/<string:name>')
api.add_resource(Genres, '/genres/')
api.add_resource(NotebookPage, '/notebooks/<int:id>/pages/')
api.add_resource(NotebookImage, '/notebooks/<int:id>/image/')
api.add_resource(Notebook, '/notebooks/<int:id>')
api.add_resource(Notebooks, '/notebooks/')
api.add_resource(Page,  '/pages/<int:id>')
api.add_resource(Pages, '/pages/')
api.add_resource(Reading, '/readings/<int:id>')
api.add_resource(PostReading, '/readings')
api.add_resource(SearchNotebooks, '/search/notebooks/<string:query>')