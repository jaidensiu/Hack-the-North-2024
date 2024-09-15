from groq import Groq
from dotenv import load_dotenv
import json
import os
import cohere
import re
import time
import requests
load_dotenv()

AUDIO_FOLDER = "voice_recordings/"
TRANSCRIPT_FOLDER = "transcripts/"

def timer_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.perf_counter()
        result = func(*args, **kwargs)
        end_time = time.perf_counter()
        execution_time = end_time - start_time
        print(f"{func.__name__} took {execution_time:.6f} seconds to execute")
        return result
    return wrapper

groq_client = Groq(
     api_key=os.getenv("groq_key"),
)

@timer_decorator
def ask_groq(query,  model="llama3-70b-8192"):
    chat_completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": query,
            }
        ],
        model=model,
    )
    return chat_completion.choices[0].message.content

@timer_decorator
def audio_to_text(filepath):
    with open(filepath, "rb") as file:
        transcription = groq_client.audio.transcriptions.create(
            file=(filepath, file.read()),
            model="whisper-large-v3",
        )
    return transcription.text

def check_file_exists(folder_path, file_name):
    full_path = os.path.join(folder_path, file_name)
    return os.path.isfile(full_path)

def main(audio_path="test", extension=".m4a"):
    transcript = ""
    if check_file_exists(TRANSCRIPT_FOLDER, audio_path + ".txt"):
        with open(os.path.join(TRANSCRIPT_FOLDER, audio_path + ".txt"), 'r') as f:
            transcript = f.read()
    else:    
        transcript = audio_to_text(os.path.join(AUDIO_FOLDER, audio_path + extension))
        with open(os.path.join(TRANSCRIPT_FOLDER, audio_path + ".txt"), 'w') as f:
            f.write(transcript)
    print(transcript)
    # we can ask llama70B 3 times to detect who is who and take the majority of vote on 
    parsed_dialouge = ask_groq(query=f"""Assosiate each of the senteces in the following text to either student, or tutor. 
Use the following format:
[sentece 1]: [either student or tutor].
[sentence 2]: [either student or tutor].
...                        
Note that the entities don't necessarly have to alternate each round.
Text to analyze: {transcript}""", model="llama3-70b-8192")
    print("\n--------Parsed Dialouge: ", parsed_dialouge)
    student_questions = ask_groq(query=f"Write a set of questions that the student can practice for their next session given the following conversation: {parsed_dialouge}")
    print("\n_______student exercises:", student_questions)
    instructor_feedback = ask_groq(query=f"Write a set of feedback for the instructor. First summarize the session main concepts, then point out how can they become better at teaching. This is the session conversation: {parsed_dialouge}")
    print("\n_______Instructor Feedback:", instructor_feedback)
    return {"dialouge": parsed_dialouge, "student_exercises": student_questions, "tutors_AI_feedback": instructor_feedback}

if __name__ == "main":
    main()
