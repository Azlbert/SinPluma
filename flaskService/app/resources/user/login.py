from flask_restful          import Resource
from flask                  import request
from flask_jwt_extended     import (
    create_access_token, 
    create_refresh_token,
)
from werkzeug.security      import safe_str_cmp
from app.models.user        import User as UserModel, LoginSchema
import bcrypt
import app

user_schema = LoginSchema()

class UserLogin(Resource):
    @classmethod
    def post(cls):
        user_json = request.get_json()
        user_data = user_schema.load(user_json)

        user = UserModel.find_by_username(user_data.user_name)
        candidate = str.encode(user_data.password_hash)
        #print(str(safe_str_cmp(candidate, user.password_hash)))

        if user and bcrypt.checkpw(candidate, user.password_hash.split(b'\0',1)[0]):
            access_token = create_access_token(identity=user.user_id, fresh=True)
            refresh_token = create_refresh_token(user.user_id)
            return {"access_token": access_token, "refresh_token": refresh_token}, 200
        return {"message" : "Incorrect password" if user else "Incorrect user"}, 400