# coding: utf-8
from sqlalchemy import BINARY, Column, DateTime, ForeignKey, String, text
from sqlalchemy.dialects.mysql import BIGINT, INTEGER, LONGTEXT
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Genre(Base):
    __tablename__ = 'genres'

    genre_id = Column(BIGINT(20), primary_key=True)
    name = Column(String(45), nullable=False, unique=True)


class Tag(Base):
    __tablename__ = 'tags'

    tag_id = Column(BIGINT(20), primary_key=True)
    name = Column(String(90), nullable=False, unique=True)


class User(Base):
    __tablename__ = 'users'

    user_id = Column(BIGINT(20), primary_key=True)
    user_name = Column(String(24), nullable=False, unique=True)
    email = Column(String(254), nullable=False, unique=True)
    first_name = Column(String(60), nullable=False)
    last_name = Column(String(60), nullable=False)
    password_hash = Column(BINARY(64), nullable=False)
    user_created = Column(DateTime, nullable=False, server_default=text("CURRENT_TIMESTAMP"))


class Notebook(Base):
    __tablename__ = 'notebooks'

    notebook_id = Column(BIGINT(20), primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), nullable=False, index=True)
    genre_id = Column(ForeignKey('genres.genre_id'), nullable=False, index=True)
    title = Column(String(80), nullable=False)
    resume = Column(String(600), nullable=False)

    genre = relationship('Genre')
    user = relationship('User')


class HasTag(Base):
    __tablename__ = 'has_tags'

    has_tag_id = Column(BIGINT(20), primary_key=True)
    notebook_id = Column(ForeignKey('notebooks.notebook_id'), nullable=False, index=True)
    tag_id = Column(ForeignKey('tags.tag_id'), nullable=False, index=True)

    notebook = relationship('Notebook')
    tag = relationship('Tag')


class Page(Base):
    __tablename__ = 'pages'

    page_id = Column(BIGINT(20), primary_key=True)
    notebook_id = Column(ForeignKey('notebooks.notebook_id'), nullable=False, index=True)
    position = Column(INTEGER(11), nullable=False)
    title = Column(String(80))
    content = Column(LONGTEXT)

    notebook = relationship('Notebook')


class Reading(Base):
    __tablename__ = 'reading'

    reading_id = Column(BIGINT(20), primary_key=True)
    user_id = Column(ForeignKey('users.user_id'), nullable=False, index=True)
    notebook_id = Column(ForeignKey('notebooks.notebook_id'), nullable=False, index=True)

    notebook = relationship('Notebook')
    user = relationship('User')
