from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle
import load_data as load


f = open('data_model.pckl', 'rb')
final_model,cv,y_data,x_data_test,accuracy = pickle.load(f)
f.close()

accuracy = accuracy_score(y_data, final_model.predict(x_data_test))
print ("\nAccuracy: "+str(accuracy))

dic_coef = {
    word : coef for word, coef in zip(cv.get_feature_names(), final_model.coef_[0])
}

print("\nBest comments words:")
for best_positive in sorted(
    dic_coef.items(), 
    key=lambda x: x[1], 
    reverse=True)[:25]:
    print (best_positive)
    
print("\nWorst comments words:")
for best_negative in sorted(
    dic_coef.items(), 
    key=lambda x: x[1])[:25]:
    print (best_negative)


















