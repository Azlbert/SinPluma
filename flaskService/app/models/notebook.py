from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.orm import relationship
from marshmallow import validates, ValidationError
from app import db, ma

class Notebook(db.Model):
    __tablename__ = 'notebooks'

    notebook_id = Column(BIGINT(20), primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), nullable=False, index=True)
    genre_id = Column(ForeignKey('genres.genre_id'), nullable=False, index=True)
    title = Column(String(80), nullable=False)
    resume = Column(String(600), nullable=False)

    genre = relationship('Genre')
    user = relationship('User')

    @classmethod
    def find_by_id(cls, id : int):
        return cls.query.filter_by(notebook_id=id).first()
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_all(cls):
        return cls.query.all()


class NotebookSchema(ma.ModelSchema):
    class Meta:
        model = Notebook
        include_fk = True
    
    @validates("title")
    def validate_title(self, value):
        if len(value) == 0:
            raise ValidationError("Cannot be empty")