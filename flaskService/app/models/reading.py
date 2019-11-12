from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import BIGINT
from sqlalchemy.sql import func
from .notebook import Notebook, NotebookSchema
from app import db, ma
from marshmallow import fields

class Reading(db.Model):
    __tablename__ = 'reading'

    reading_id = Column(BIGINT(20), primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), nullable=False, index=True)
    notebook_id = Column(ForeignKey('notebooks.notebook_id'), nullable=False, index=True)

    notebook = relationship('Notebook')
    user = relationship('User')

    @classmethod
    def find(cls, user: int, notebook: id):
        return cls.query.filter_by(user_id=user,notebook_id=notebook).first()

    @classmethod
    def find_by_id(cls, id : int):
        return cls.query.filter_by(reading_id=id).first()

    @classmethod
    def find_user_list(cls, id : int, include_notebook_info: bool=False):
        if include_notebook_info:
            return cls.query.join(Notebook, Reading.notebook_id==Notebook.notebook_id).filter(Reading.user_id==id).all()
        return cls.query.filter_by(user_id=id).all()
    
    @classmethod
    def exists(cls, user: int, notebook : int):
        return cls.query.filter_by(user_id=user,notebook_id=notebook).first() is not None
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

class ReadingSchema(ma.ModelSchema):
    class Meta:
        model = Reading
        exclude = ("user","notebook")
        include_fk = True

class ReadingNotebookSchema(ma.ModelSchema):
    #reading = fields.Nested(ReadingSchema)
    notebook = fields.Nested(NotebookSchema)