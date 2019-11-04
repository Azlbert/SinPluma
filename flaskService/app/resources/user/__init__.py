from flask                  import Blueprint
from flask_restful          import Api
from .user                  import User, UserNotebooks, UserReadings
from .register              import UserRegister
from .login                 import UserLogin
from .logout                import UserLogout
from .token_refresh         import TokenRefresh

user_blueprint = Blueprint('user', __name__)
api = Api(user_blueprint)

api.add_resource(UserNotebooks, '/user/<int:id>/notebooks')
api.add_resource(UserReadings, '/user/<int:id>/readings')
api.add_resource(User, '/user/<int:id>')
api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(TokenRefresh, '/refresh')