from flask                  import Blueprint, request
from flask_restful          import Api, Resource, reqparse
from flask_jwt_extended     import jwt_required
#from app.server     import jwt

works = Blueprint('works', __name__)
api = Api(works)

worksList = [
    {'id':1,'title':'Don Quijote','description':'Test descrption','userId':1},
    {'id':2,'title':'La rosa','description':'Test descrption','userId':2},
    {'id':3,'title':'El extraño','description':'Test descrption','userId':2},
    {'id':4,'title':'La niña','description':'Test descrption','userId':3},
    {'id':5,'title':'Siempre','description':'Test descrption','userId':3},
]

class Work(Resource):
    def get(self, title):
        work = next(filter(lambda x: x['title'] == title, worksList), None)
        if work is not None:
            print("Found")
        return {'item': work}, 200 if work else 404
    
    def post(self,title):
        if next(filter(lambda x: x['title'] == title, worksList), None) is not None:
            return {'message':'An item already exist'}, 400
        
        data = request.get_json()
        worksList.append(data)
        return data, 201
    
    @jwt_required
    def delete(self, title):
        global worksList
        worksList = list(filter(lambda x: x['title'] != title, worksList))
        return {'message': 'Item deleted'}
    
    def put(self, title):
        parser = reqparse.RequestParser()
        parser.add_argument('comment',
            type=str,
            required=True,
            help="This field cannot be left blank!"
        )
        data = parser.parse_args()

        work = next(filter(lambda x: x['title'] == title, worksList), None)
        if not work:
            work = data
            worksList.append(data)
        else:
            work.update(data)
        return work



class Works(Resource):
    def get(self):
        return {'books':worksList},200

api.add_resource(Work, '/work/<string:title>')
api.add_resource(Works, '/works/')
