from openai import OpenAI
import requests
from docx import Document
import json

question_json_schema = {
    "type": "json_schema",
    "json_schema": {
        "name": "questions",
        "schema": {
            "type": "object",
            "properties": {
                "questions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {"type": "string"},
                            "questionBasis": {"type": "string"},
                        },
                        "required": ["question", "questionBasis"]
                    },
                    "minItems": 1,
                }
            },
            "required": ["questions"]
        },
    }
}

class InterviewServices:
    @staticmethod
    def read_cv_doc(token, cv_id):
        """Authenticate a user by verifying email and password."""

        headers = {
          'Authorization': 'Bearer {}'.format(token),
          'Accept': 'application/json'  # Adjust content type as needed
        }

        response = requests.get("http://127.0.0.1:5000/cv/{}".format(cv_id),headers)

        with open('temp.docx', 'wb') as f:
            f.write(response.content)
        
        all_elements = []
        finalString = ""

        doc = Document('temp.docx')
        tablesTrack = 0
        tablesList = doc.tables

        for element in doc.element.body:
            if element.tag.endswith('p'):
                para_text = element.text
                all_elements.append(para_text)
            
            elif element.tag.endswith('tbl'):
                thisTable =  tablesList[tablesTrack]
                for row in thisTable.rows:
                    for cell in row.cells:
                        if cell.text not in all_elements:
                            all_elements.append(cell.text)
                tablesTrack = tablesTrack+1

        for element in all_elements:
            finalString = finalString + element + "\n"
      
        return finalString
    
    @staticmethod
    def generate_questions(cv_as_string,difficulty):

        client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

        response = client.chat.completions.create(
        model="qwen2.5-coder-7b-instruct",
        messages=[ 
            {"role": "system", "content": f"Generate 5 interview questions, some based on the provided CV others looking at soft skills. Make the questions {difficulty}. CV: {cv_as_string}"},
            ],
        temperature=0.7, 
        response_format=question_json_schema
        )

        return response.choices[0].message.content
    
    @staticmethod
    def add_questions_to_session(token,questions,session_id):
            
        headers = {
          'Authorization': 'Bearer {}'.format(token),
          'Accept': 'application/json'  # Adjust content type as needed
        }
        print(headers)
        print("WE TRIED______________________________________________________________________")

        requests.post("http://127.0.0.1:5000/interview/{}/questions".format(session_id),headers=headers,json=questions)
        
            
        return
