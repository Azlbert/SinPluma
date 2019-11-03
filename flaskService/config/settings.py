from datetime import timedelta

ACCESS_EXPIRES = timedelta(minutes=15)
REFRESH_EXPIRES = timedelta(days=30)

DEBUG   = True
PROPAGATE_EXCEPTIONS = True

JWT_ACCESS_TOKEN_EXPIRES = ACCESS_EXPIRES
JWT_REFRESH_TOKEN_EXPIRES = REFRESH_EXPIRES
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@inno_router:6446/SinPluma?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
REDIS_URL = "redis://:@redis:6379/0"

""" 
from app import db, Base

print("--- From UserModel ---")
print(str(Base.classes.keys()))
print('db.Model         --> ' + str(type(db.Model)))
print('Base.class.users --> ' + str(type(Base.classes.users)))
print("--- From UserModel ---")
class UserModel(Base.classes.users):
    #__table__ = Table('users', Base.metadata, autoload=True, autoload_with=db.engine)
    
    @classmethod
    def find_by_id(cls, id : int):
        return db.session.query(UserModel).filter_by(user_id=id).first().json()
        #return cls.User.filter_by(user_id=id).first()
    
    @classmethod
    def find_by_username(cls, user_name : str):
        return UserModel.filter_by(user_name=user_name).first()
    
    @classmethod
    def register(cls, user):
        global db
        data = {
            'user_name': user['user_name'],
            'email': 'algo@fc.cs',
            'first_name': 'Adrian',
            'last_name': 'Gutierrez',
            'password_hash': str.encode(user['password_hash']),
        }
        new_user = UserModel(**data)
        db.session.add(new_user)
        db.session.commit()

"""