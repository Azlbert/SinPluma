from flask_restful          import Resource
from flask                  import request
from flask_jwt_extended     import (
    jwt_refresh_token_required, 
    get_jwt_identity,
    create_access_token
)
from werkzeug.security      import safe_str_cmp
from app.models.user        import User as UserModel, UserSchema

user_schema = UserSchema()

class TokenRefresh(Resource):
    @classmethod
    @jwt_refresh_token_required
    def post(cls):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity=current_user, fresh=False)
        return {"access_token": new_token}, 200