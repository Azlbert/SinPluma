from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle
import load_data as load

reviews_train   = load.extract_from_path('data/spanish_full_train.txt')[:25000]
reviews_test    = load.extract_from_path('data/spanish_full_test.txt')[:25000]

cv = CountVectorizer(binary=True)
cv.fit(reviews_train)

x_data      = cv.transform(reviews_train)
x_data_test = cv.transform(reviews_test)
y_data      = [1 if i < 12500 else 0 for i in range(25000)]

final_model = LogisticRegression(C=0.05)
final_model.fit(x_data, y_data)


accuracy = accuracy_score(y_data, final_model.predict(x_data_test))
print ("\nAccuracy: "+str(accuracy))

data = final_model,cv,y_data,x_data_test,accuracy
f = open('data_model.pckl', 'wb')
pickle.dump(data, f)
f.close()

dic_coef = {
    word : coef for word, coef in zip(cv.get_feature_names(), final_model.coef_[0])
}

print("\nBest comments words:")
for best_positive in sorted(
    dic_coef.items(), 
    key=lambda x: x[1], 
    reverse=True)[:10]:
    print (best_positive)
    
print("\nWorst comments words:")
for best_negative in sorted(
    dic_coef.items(), 
    key=lambda x: x[1])[:10]:
    print (best_negative)