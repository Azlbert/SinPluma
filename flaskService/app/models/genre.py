from sqlalchemy import Column, String
from sqlalchemy.dialects.mysql import BIGINT
from marshmallow import validates, ValidationError
from app import db, ma

class Genre(db.Model):
    __tablename__ = 'genres'

    genre_id = Column(BIGINT(20), primary_key=True)
    name = Column(String(45), nullable=False, unique=True)

    @classmethod
    def find_by_id(cls, id : int):
        return cls.query.filter_by(genre_id=id).first()
    
    @classmethod
    def find_by_name(cls, name : str):
        return cls.query.filter_by(name=name).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_all(cls):
        return cls.query.all()



class GenreSchema(ma.ModelSchema):
    class Meta:
        model = Genre
    
    @validates("name")
    def validate_title(self, value):
        if len(value) == 0:
            raise ValidationError("Cannot be empty")