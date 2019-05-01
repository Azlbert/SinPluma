# Installation in Linux
Install virtualenv
``` terminal
sudo pip3 install virtualenv
```

Create a virtual environment (called 'env')
``` terminal
virtualenv env --python=python3
```

Activate the virtualenv
``` terminal
source env/bin/activate
```
For exiting the virtual environment just type: 'deactivate'

Once activated, install the requirements file
``` terminal
pip install -r requirements.txt
```

# Running in the terminal of Linux
Run the next terminal command.
``` terminal
gunicorn -b 0.0.0.0:5000 wsgi:app
```
