from flask                  import send_file, request
from flask_restful          import Resource, reqparse
from app                    import mio
import werkzeug
import io

class Image(Resource):
    @classmethod
    def post(cls,id:int):
        try:
            value_as_bytes = request.files['image'].read()
            value_as_a_stream = io.BytesIO(value_as_bytes)

            mio.connection.put_object(
                bucket_name="profile",
                object_name= str(id) + ".jpg", 
                length=len(value_as_bytes),
                data=value_as_a_stream
            )
        except Exception:
            return {'message':'Error Uploading'}, 400
        return {'message':'Profile images uploaded'}, 201
    
    @classmethod
    def get(cls,id:int):
        image_binary = None
        try:
            image_binary = mio.connection.get_object(
                bucket_name="profile",
                object_name= str(id) + ".jpg"
            )
        except Exception:
            return {'message':'Image not found'}, 404
        return send_file(
                    image_binary,
                    mimetype='image/jpeg',
                    as_attachment=True,
                    attachment_filename='%s.jpg' % id
                )