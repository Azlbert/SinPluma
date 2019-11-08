from flask                  import request
from flask_restful          import Resource
from app.models.reading     import Reading as ReadingModel, ReadingSchema
from flask_jwt_extended     import (
    jwt_required,
    get_raw_jwt,
    get_jwt_identity
)

reading_schema = ReadingSchema()

class Reading(Resource):
    @classmethod
    @jwt_required
    def get(cls, id):
        reading = ReadingModel.find_by_id(id)
        if reading is None:
            return {'message': 'Reading do not exists'}, 400
        
        return {'data': reading_schema.dump(reading)}, 200

    @classmethod
    @jwt_required
    def delete(cls, id):
        reading = ReadingModel.find_by_id(id)
        if reading is None:
            return {'message': 'Reading do not exists'}, 400
        
        reading.delete_from_db()

        return {'message': 'Deleted'}, 200

class PostReading(Resource):
    @classmethod
    def get(cls):
        user = request.args['user']
        notebook = request.args['notebook']
        reading = ReadingModel.find(user,notebook)
        if reading is None:
            return {'message': 'Reading do not exists'}, 400
        
        return {'data': reading_schema.dump(reading)}


    @classmethod
    @jwt_required
    def post(cls):
        reading_json = request.get_json()
        user_id = get_jwt_identity()
        if ReadingModel.exists(user_id,reading_json["notebook"]):
            return {'message':'Reading exists'}, 400

        reading_json['user'] = user_id
        reading = reading_schema.load(reading_json)
        
        reading.save_to_db()

        return {'message': 'Reading created successfully ', 'data' : reading_schema.dump(reading)}, 201