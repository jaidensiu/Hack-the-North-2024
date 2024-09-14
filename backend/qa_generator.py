from groq import Groq
from dotenv import load_dotenv
import json
import os
import cohere
import re
import time
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
co = cohere.Client(api_key=os.getenv("cohere_key"))

@timer_decorator
def ask_groq(client, query, model):
    chat_completion = client.chat.completions.create(
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
def ask_cohere(subject):
    print(f"Calling cohere to generate questions for: {subject}")
    response = co.chat(
  model="command-r",
  message=f"""Generate 20 multiple-choice questions and 2 written-response questions related to {subject}, using the provided documents as reference. Follow this format:
For each multiple-choice question:
Q1: [Question text]
Choices:
    a) [Choice 1]
    b) [Choice 2]
    c) [Choice 3]
    d) [Choice 4]
    A1: [Correct answer letter]

Repeat this for Q1 to Q20.

For the written-response questions:
Written Question 1: [Question text]
Written Response 1: [Sample answer or guidelines for the response]

Written Question 2: [Question text]
Written Response 2: [Sample answer or guidelines for the response]

Ensure the questions cover key topics from {subject} and are varied in difficulty.""")
    print("Cohere call finished")
    return response


def post_processing(response):
    multiple_choice_questions = re.findall(r'Q\d+: (.*?)\nChoices:', response.text, re.DOTALL)
    multiple_choice_choices = re.findall(r'Choices:\n\s*(.*?\n)(?:A)', response.text, re.DOTALL)
    multiple_choice_answers = re.findall(r'A\d+: ([a-d])', response.text, re.DOTALL)
    written_questions = re.findall(r'Written Question \d+: (.*?)\nWritten Response', response.text, re.DOTALL)
    written_answers = re.findall(r'Written Response \d+: (.*?\.)', response.text, re.DOTALL)
    return multiple_choice_questions, multiple_choice_choices, multiple_choice_answers, written_questions, written_answers

def check_file_exists(folder_path, file_name):
    full_path = os.path.join(folder_path, file_name)
    return os.path.isfile(full_path)

def main(subject = "physics11"):
    if check_file_exists("json_files", subject + ".json"):
        # simply read the file and return it
        print("File already exists")
        with open(f"json_files/{subject}.json", 'r') as f:
            qas = json.load(f)
        return qas
    
    response = ask_cohere(subject)
    multiple_choice_questions, multiple_choice_choices, multiple_choice_answers, written_questions, written_answers = post_processing(response)
    print("length of the questions:\n", str(len(multiple_choice_questions)))
    groq_responses = []
    approved_indecies = []

    for i in range(len(multiple_choice_questions)):
        question = multiple_choice_questions[i]
        question_with_multiple_choice = question + " " + multiple_choice_choices[i]
        print("QUESTIONS:\n", question_with_multiple_choice)
        prompt = "Answer the following multiple choice in the following format: 'Answer: [correct answer letter]. Question: " + question_with_multiple_choice
        # print("PROMPT: ", prompt)
        groq_response = ask_groq(groq_client, query=prompt, model="llama3-70b-8192")
        print("\n+++++++Groq_response: ", groq_response)
        # take the answer letter

        groq_response_letter = re.findall(r'(?:\s*Answer:\s*)([a-d])', groq_response, re.DOTALL)
        if len(groq_response_letter) == 0:
            print("\nGroq response was empty")
            continue
        else:
            groq_response_letter = groq_response_letter[0]
        # print("groq_response_letter: ", groq_response_letter)
        groq_responses.append(groq_response_letter)
        if groq_response_letter == multiple_choice_answers[i]:
            print("Correct")
            approved_indecies.append(i)
        else:
            print(f"---------------Incorrect response for question: {question_with_multiple_choice}\n, Cohere response: {multiple_choice_answers[i]}\nbut Groq response: {groq_response_letter}")
  # response = ask_groq(question)
  # print(response)

    qa_json = {
        "multiple_choice_questions": [multiple_choice_questions[i] for i in range(len(approved_indecies))],
        "multiple_choice_choices": [multiple_choice_choices[i] for i in range(len(approved_indecies))],
        "multiple_choice_answers": [multiple_choice_answers[i] for i in range(len(approved_indecies))],
        "written_questions": written_questions,
        "written_answers": written_answers
    }

    with open(f'json_files/{subject}.json', 'w') as f:
        json.dump(qa_json, f)
    return qa_json

if __name__ == "__main__":    
    main()
