from flask import Flask, request
from qa_generator import main as generate_questions 
from voice_analyzer import main as analyze_voice
from score import calculate_score as grader 
from convex import ConvexClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # This allows all origins

convex_client = ConvexClient("https://insightful-dove-228.convex.cloud")

@app.route('/qas')
def qas_handler():
    subject = request.args.get('subject', 'physics12')
    subject = subject.replace(" ", '')
    # checking if the path already exists for the subject

    qas = generate_questions(subject)
    return qas 

@app.route('/score', methods=['POST'])
def score_handler():
    data = request.get_json()
    if not data:
        return 0
    score = grader(data["answer"], data["tutor_response"])
    return score 

@app.route('/voice')
def voice_handler():
    path_file = request.args.get('voice_path', 'voice_recordings/test.m4a')
    session_id = request.args.get('session_id')
    voice_content  = analyze_voice(path_file)
    student_exercises = voice_content["student_exercises"]
    tutors_AI_feedback = voice_content["tutors_AI_feedback"]
    
    # Call the Convex mutation
    convex_client.mutation(
        "updateSessionFeedback",
        {
            "id": session_id,
            "studentExercises": student_exercises,
            "tutorsAIFeedback": tutors_AI_feedback
        }
    )
    return voice_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)
