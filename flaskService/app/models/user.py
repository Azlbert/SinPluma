class __user:
    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password
    
users = [
    __user(1,'echo','pwd'),
    __user(2,'kira','pwd')
]

username_mapping = {
    u.username : u for u in users
}

userid_mapping = {
    u.id : u for u in users
}

class User:
    @classmethod
    def find_by_username(cls, username: str):
        return username_mapping.get(username, None)

    @classmethod
    def find_by_id(cls, id: int):
        return userid_mapping.get(id, None)