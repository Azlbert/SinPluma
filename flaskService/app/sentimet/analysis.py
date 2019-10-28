from flask                  import request
from flask_restful          import Resource

class Analysis(Resource):
    @classmethod
    def get(cls):
        key = request.args['key']
        sentence = request.args['sentence']
        sentiment = 'positive' if len(sentence) % 2 == 0 else 'negative'
        return {"key":key,"sentiment":sentiment}, 200