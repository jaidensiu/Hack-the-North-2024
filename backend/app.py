from flask import Flask, request
from qa_generator import main as generate_questions 

app = Flask(__name__)



@app.route('/qas')
def hello():
    subject = request.args.get('subject', 'physics12')
    subject = subject.replace(" ", '')
    # checking if the path already exists for the subject

    qas = generate_questions(subject)
    return qas 

if __name__ == '__main__':
    app.run(debug=True)
