from flask import Flask, jsonify, request
from qa_generator import main as generate_questions 
from voice_analyzer import main as analyze_voice
from score import calculate_score as grader 
from convex import ConvexClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # This allows all origins

@app.route('/qas')
def qas_handler():
    subject = request.args.get('subject', 'physics12')
    subject = subject.replace(" ", '')
    # checking if the path already exists for the subject

    qas = generate_questions(subject)
    return qas 


@app.route('/score', methods=['POST'])
def score_handler():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        if "answer" not in data or "tutor_response" not in data:
            return jsonify({"error": "Missing required fields"}), 400
        
        score = grader(data["answer"], data["tutor_response"])
        
        return jsonify({"score": score}), 200
    
    except Exception as e:
        print(f"Error in score_handler: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/voice')
def voice_handler():
    path_file = request.args.get('voice_path', 'test')
    extension = request.args.get('extension', '.m4a')
    voice_content  = analyze_voice(path_file, extension)
    return voice_content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)
