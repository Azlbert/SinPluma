from app.models import User

security_key = 'x¿Jñ|lm0_'

def authenticate(username,password):
    user = User.find_by_username(username)
    print(user)
    if user and user.password == password:
        return user

def identity(payload:[]):
    user_id = payload['identity']
    print(user_id)
    return User.find_by_id(user_id)