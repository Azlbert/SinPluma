# coding: utf-8
from sqlalchemy import BINARY, BigInteger, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.schema import FetchedValue
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Genre(db.Model):
    __tablename__ = 'genres'

    genre_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(45), nullable=False, unique=True)


class HasTag(db.Model):
    __tablename__ = 'has_tags'

    has_tag_id = db.Column(db.BigInteger, primary_key=True)
    notebook_id = db.Column(db.ForeignKey('notebooks.notebook_id'), nullable=False, index=True)
    tag_id = db.Column(db.ForeignKey('tags.tag_id'), nullable=False, index=True)

    notebook = db.relationship('Notebook', primaryjoin='HasTag.notebook_id == Notebook.notebook_id', backref='has_tags')
    tag = db.relationship('Tag', primaryjoin='HasTag.tag_id == Tag.tag_id', backref='has_tags')


class Notebook(db.Model):
    __tablename__ = 'notebooks'

    notebook_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.user_id'), nullable=False, index=True)
    genre_id = db.Column(db.ForeignKey('genres.genre_id'), nullable=False, index=True)
    title = db.Column(db.String(80), nullable=False)
    resume = db.Column(db.String(600), nullable=False)

    genre = db.relationship('Genre', primaryjoin='Notebook.genre_id == Genre.genre_id', backref='notebooks')
    user = db.relationship('User', primaryjoin='Notebook.user_id == User.user_id', backref='notebooks')


class Page(db.Model):
    __tablename__ = 'pages'

    page_id = db.Column(db.BigInteger, primary_key=True)
    notebook_id = db.Column(db.ForeignKey('notebooks.notebook_id'), nullable=False, index=True)
    position = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(80))
    content = db.Column(db.String)

    notebook = db.relationship('Notebook', primaryjoin='Page.notebook_id == Notebook.notebook_id', backref='pages')


class Reading(db.Model):
    __tablename__ = 'reading'

    reading_id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.ForeignKey('users.user_id'), nullable=False, index=True)
    notebook_id = db.Column(db.ForeignKey('notebooks.notebook_id'), nullable=False, index=True)

    notebook = db.relationship('Notebook', primaryjoin='Reading.notebook_id == Notebook.notebook_id', backref='readings')
    user = db.relationship('User', primaryjoin='Reading.user_id == User.user_id', backref='readings')


class Tag(db.Model):
    __tablename__ = 'tags'

    tag_id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(90), nullable=False, unique=True)


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.BigInteger, primary_key=True)
    user_name = db.Column(db.String(24), nullable=False, unique=True)
    email = db.Column(db.String(254), nullable=False, unique=True)
    first_name = db.Column(db.String(60), nullable=False)
    last_name = db.Column(db.String(60), nullable=False)
    password_hash = db.Column(db.BINARY(64), nullable=False)
    user_created = db.Column(db.DateTime, nullable=False, server_default=db.FetchedValue())
