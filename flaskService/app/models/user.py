from sqlalchemy import BINARY, Column, DateTime, String, text
from sqlalchemy.dialects.mysql import BIGINT
from app import db, ma
import bcrypt

class User(db.Model):
    __tablename__ = 'users'

    user_id = Column(BIGINT(20), primary_key=True)
    user_name = Column(String(24), nullable=False, unique=True)
    email = Column(String(254), nullable=False, unique=True)
    first_name = Column(String(60), nullable=False)
    last_name = Column(String(60), nullable=False)
    password_hash = Column(BINARY(64), nullable=False)
    user_created = Column(DateTime, nullable=False, server_default=text("CURRENT_TIMESTAMP"))

    @classmethod
    def find_by_id(cls, id : int):
        return cls.query.filter_by(user_id=id).first()
    
    @classmethod
    def find_by_username(cls, user_name : str):
        return cls.query.filter_by(user_name=user_name).first()
    
    def save_to_db(self):
        self.password_hash = bcrypt.hashpw(str.encode(self.password_hash), bcrypt.gensalt())
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        load_only = ("password_hash",)

class LoginSchema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ("user_name", "password_hash",)