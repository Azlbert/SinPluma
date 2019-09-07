import itertools

users = []
username_mapping = {}
userid_mapping = {}

class User:
    id_counter = itertools.count(1)

    def __init__(self, username, password):
        self.id = next(self.id_counter)
        self.username = username
        self.password = password

    def __repr__(self):
        return str(self.id) + ' - ' + str(self.username)
    
    def json(self):
        return {'id':self.id, 'username': self.username, 'password': self.password}

    @staticmethod
    def find_by_username(username: str):
        user = username_mapping.get(str(username), None)
        return user.json() if user is not None else None

    @staticmethod
    def find_by_id(id: int):
        user = userid_mapping.get(id, None)
        return user.json() if user is not None else None

    @staticmethod
    def get_list(cls) -> []:
        return users

    @staticmethod
    def add_user(user):
        global username_mapping, userid_mapping
        users.append(user)
        username_mapping = {
            u.username : u for u in users
        }
        userid_mapping = {
            u.id : u for u in users
        }

User.add_user(User('Jose','abcd'))
User.add_user(User('Daniel','abcd'))
User.add_user(User('Miguel','abcd'))
User.add_user(User('Pedroza','abcd'))