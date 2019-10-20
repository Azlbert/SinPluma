from flask                  import request
from flask_restful          import Resource
from app.models.genre       import Genre as GenreModel, GenreSchema

genre_schema = GenreSchema()
genre_list_schema = GenreSchema(many=True)

class Genre(Resource):
    @classmethod
    def get(cls, name):
        genre = GenreModel.find_by_id(int(name))
        if not genre:
            return {'message':'Genre not found'}, 404
        return genre_schema.dump(genre), 200


class Genres(Resource):
    @classmethod
    def get(cls):
        return {"genres": genre_list_schema.dump(GenreModel.find_all())}, 200
    
    @classmethod
    def post(cls):
        genre_json = request.get_json()
        genre = genre_schema.load(genre_json)
        if GenreModel.find_by_name(genre.name):
            return {"message": "Genre exists"}, 400

        genre = GenreModel(name=genre.name)
        genre.save_to_db()

        return {'message': 'Genre created successfully ', 'data' : genre_schema.dump(genre)}, 201