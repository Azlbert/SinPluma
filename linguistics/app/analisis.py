import pickle

final_model = None
cv = None
y_data = None
x_data_test = None
accuracy = None

# Is called from create app
def load_model():
    global final_model,cv,y_data,x_data_test,accuracy
    f = open('data_model.pckl', 'rb')
    final_model,cv,y_data,x_data_test,accuracy = pickle.load(f)
    f.close()