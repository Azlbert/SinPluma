from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import BIGINT, LONGTEXT, INTEGER
from marshmallow import validates, ValidationError
from sqlalchemy.sql import func
from .notebook import Notebook
from app import db, ma

class Page(db.Model):
    __tablename__ = 'pages'

    page_id = Column(BIGINT(20), primary_key=True)
    notebook_id = Column(ForeignKey('notebooks.notebook_id'), nullable=False, index=True)
    position = Column(INTEGER(11), nullable=False)
    title = Column(String(80))
    content = Column(LONGTEXT)

    notebook = relationship('Notebook')

    @classmethod
    def find_by_id(cls, id : int):
        return cls.query.filter_by(page_id=id).first()
    
    
    def save_to_db(self):
        if not self.position:
            count = self.query.filter_by(notebook_id=self.notebook_id).count() + 1
            self.position = count
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        pages = self.query.filter(Page.position > self.position).all()
        for page in pages:
            page.position -= 1
            page.save_to_db()

        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def find_all(cls):
        return cls.query.all()

    @classmethod
    def find_all_pages_of_notebook(cls, id : int):
        return cls.query.filter_by(notebook_id=id).all()

class PageSchema(ma.ModelSchema):
    class Meta:
        model = Page
        dump_only = ("position",)
        load_only = ("content",)
        exclude = ("notebook",)
        include_fk = True
    
    @validates("position")
    def validate_position(self, value: id):
        if value <= 0:
            raise ValidationError("Cannot be less or equal than zero")
    
    @validates("notebook_id")
    def validate_notebook_id(self, value: id):
        if Notebook.find_by_id(value) == None:
            raise ValidationError("The notebook does not exist")
    
class PageEditorSchema(ma.ModelSchema):
    class Meta:
        model = Page
        fields = ("content","title","notebook_id")