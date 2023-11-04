from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

@app.route('/')
def hello_world():
    return 'Welcome to Medicai!'

@app.route('/submit')
def submit():
      return 'Submission Complete'


@app.route('/chat')
def send():
      return 'Ayo yo health is wack!'



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)