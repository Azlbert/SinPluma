from sqlalchemy import BINARY, Column, DateTime, String, text
from sqlalchemy.dialects.mysql import BIGINT
from marshmallow import validates, ValidationError
from app import db, ma
import bcrypt
import re

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

def is_email_valid(value):
    regex = r'^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
    return re.fullmatch(regex,value)

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        load_only = ("password_hash",)
    
    @validates("user_name")
    def validate_user_name(self, value):
        if len(value) < 4:
            raise ValidationError("Username to short")
        regex = r'^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\_[a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$'
        if not re.fullmatch(regex,value):
            raise ValidationError("Username with bad format")

    @validates("email")
    def validate_email(self, value):
        if not is_email_valid(value):
            raise ValidationError("Invalid email")
    
    @validates("first_name")
    def validate_first_name(self, value):
        if len(value) == 0:
            raise ValidationError("Cannot be empty")
        regex = r'^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$'
        if not re.fullmatch(regex,value):
            raise ValidationError("First name with bad format")
    
    @validates("last_name")
    def validate_last_name(self, value):
        if len(value) == 0:
            raise ValidationError("Cannot be empty")
        regex = r'^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$'
        if not re.fullmatch(regex,value):
            raise ValidationError("Last name with bad format")

    @validates("password_hash")
    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("Password to short")

class LoginSchema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ("user_name", "password_hash",)