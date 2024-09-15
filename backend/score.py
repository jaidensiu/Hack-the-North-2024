from groq import Groq
from dotenv import load_dotenv
import json
import os
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

def calculate_score(answer="", tutor_response=""):
    response = ask_groq(f"On the scale of 1-10 how similar are these two responses? Response 1: {answer}\nResponse 2: {tutor_response}\n Respond in this format: Score: [score]")
    return response

if __name__ == "main":
    calculate_score()

