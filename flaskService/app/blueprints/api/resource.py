from flask          import Blueprint, request
from flask_restful  import Api, Resource, reqparse
from flask_jwt      import jwt_required
#from app.server     import jwt

books = Blueprint('api', __name__)
api = Api(books)

booksList = []

class Book(Resource):
    @jwt_required()
    def get(self, title):
        book = next(filter(lambda x: x['title'] == title, booksList), None)
        if book is not None:
            print("Found")
        return {'item': book}, 200 if book else 404
    
    def post(self,title):
        if next(filter(lambda x: x['title'] == title, booksList), None) is not None:
            return {'message':'An item already exist'}, 400
        
        data = request.get_json()
        booksList.append(data)
        return data, 201
    
    def delete(self, title):
        global booksList
        booksList = list(filter(lambda x: x['title'] != title, booksList))
        return {'message': 'Item deleted'}
    
    def put(self, title):
        parser = reqparse.RequestParser()
        parser.add_argument('comment',
            type=str,
            required=True,
            help="This field cannot be left blank!"
        )
        data = parser.parse_args()

        book = next(filter(lambda x: x['title'] == title, booksList), None)
        if not book:
            book = data
            booksList.append(data)
        else:
            book.update(data)
        return book



class Books(Resource):
    def get(self):
        return {'books':booksList},200

api.add_resource(Book, '/book/<string:title>')
api.add_resource(Books, '/books/')