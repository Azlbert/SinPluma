from flask import Blueprint

page = Blueprint('page', __name__)

@page.route('/')
def home():
    return 'Homx'

@page.route('/about/')
def about():
    return 'I am Alberto!'

@page.route('/contact/')
def contact():
    return 'Call me baby'

@page.route('/search/')
def search():
    return 'Searchin!'

@page.route('/search/non/')
def search_non():
    return 'Searchin nonon'