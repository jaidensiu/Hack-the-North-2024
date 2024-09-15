from groq import Groq
from dotenv import load_dotenv
import json
import os
import cohere
import re
import time
import requests
load_dotenv()

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

def main(music_path="voice_recordings/test.m4a", tutor_id=""):
#     transcript = audio_to_text(music_path)
#     print(transcript)
#     # we can ask llama70B 3 times to detect who is who and take the majority of vote on 
#     parsed_dialouge = ask_groq(query=f"""Assosiate each of the senteces in the following text to either student, or tutor. 
# Use the following format:
# [sentece 1]: [either student or tutor].
# [sentence 2]: [either student or tutor].
# ...                        
# Note that the entities don't necessarly have to alternate each round.
# Text to analyze: {transcript}""", model="llama3-70b-8192")
#     print("\n--------Parsed Dialouge: ", parsed_dialouge)
#     student_questions = ask_groq(query=f"Write a set of questions that the student can practice for their next session given the following conversation: {parsed_dialouge}")
#     instructor_feedback = ask_groq(query=f"Write a set of feedback for the instructor. First summarize the session main concepts, then point out how can they become better at teaching. Talk to them directly as a mentor. This is the session conversation: {parsed_dialouge}")
#     print(instructor_feedback)
    parsed_dialouge = "test"
    student_questions = "What is a cell?"
    instructor_feedback = "Try harder!"
    return {"dialouge": parsed_dialouge, "student_exercises": student_questions, "tutors_AI_feedback": instructor_feedback}

if __name__ == "main":
    main()
