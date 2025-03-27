from openai import OpenAI
from docx import Document
from ..models.CV import CV
from ..models.InterviewQuestion import InterviewQuestion
from ..models.InterviewSession import InterviewSession

from io import BytesIO
from ..exts import db
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
    def read_cv_doc(cv_id):
        #Read CV from the DB
        cv = CV.query.filter_by(id=cv_id).first()
        if not cv:
            return "CV not found"
        file_data = cv.file_data
        fs = BytesIO(file_data)
        doc = Document(fs)
        finalString = ""

        tablesTrack = 0
        tablesList = doc.tables
        all_elements = []
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
    def generate_questions(cv_as_string,job_description,difficulty):

        client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")
        
        #Get rid of data we dont want to send to the LLM
        job_description.pop("id")
        job_description.pop("userid")
        job_description.pop("created_at")
        job_description.pop("updated_at")

        response = client.chat.completions.create(
        model="qwen2.5-coder-7b-instruct",
        messages=[ 
            {"role": "system", "content": f"Generate 5 interview questions, some based on the provided CV and job description others looking at soft skills. Consider how well the CV matches the job description. Make the questions {difficulty}."},
            {"role": "user", "content":f"CV: {cv_as_string}"},
            {"role": "user", "content":f"Job Description: {job_description}"}
            ],
        temperature=0.7, 
        response_format=question_json_schema
        )

        return response.choices[0].message.content
    
    @staticmethod
    def add_questions_to_session(questionsJson,session_id):
        session = InterviewSession.query.get(session_id)
        
        for questionData in json.loads(questionsJson)["questions"]:
            new_question = InterviewQuestion(
                question_text=questionData["question"],
                category=questionData["questionBasis"]
            )
            db.session.add(new_question)
            db.session.flush()
            session.questions.append(new_question)  # This automatically adds to the link table
        db.session.commit()
        return 
