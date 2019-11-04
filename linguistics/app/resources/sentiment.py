from flask                  import request
from flask_restful          import Resource
from app.analisis           import final_model, cv

class SentimentAnalysis(Resource):
    @classmethod
    def get(cls):
        key = request.args['key']
        sentence = request.args['sentence']
        prediction = final_model.predict(cv.transform([sentence]))[0]
        sentiment = 'positive' if prediction == 0 else 'negative'
        return {"key":key,"sentiment":sentiment}, 200

class X(Resource):
    @classmethod
    def get(cls):
        return {"key":"key","sentiment":"sentiment"}, 200