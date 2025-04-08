from openai import OpenAI
from docx import Document
from ..models.CV import CV
from ..models.InterviewQuestion import InterviewQuestion
from ..models.InterviewSession import InterviewSession
from ..models.UserResponse import UserResponse

from io import BytesIO
from ..exts import db
import json
import os

question_json_schema = {
    "type": "json_schema",
        "json_schema": {
            "name": "question",
            "schema": {
                "type": "object",
                "properties": {
                    "questionText": {"type": "string"},
                    "questionCategory": {"type": "string"},
                    "questionBasis":{"type":"string"},
                    "justification":{"type":"string"},
                    "followup" : {"type":"boolean"},
                },
                "required": ["questionText", "questionCategory", "questionBasis","justification","followup"]
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
    def generate_question(cv_as_string,job_description,difficulty,session_id,context=None):

        client = OpenAI(base_url=os.getenv("LLM_URL"), api_key=os.getenv("LLM_KEY"))
        
        #Get rid of data we dont want to send to the LLM
        job_description.pop("id")
        job_description.pop("userid")
        job_description.pop("created_at")
        job_description.pop("updated_at")

        session = InterviewSession.query.filter_by(id=session_id).options(db.joinedload(InterviewSession.questions).joinedload(InterviewQuestion.user_response)).first()

        catagoryString = f"Categorise the question as either soft skills or technical. Describe the question basis as either CV, job description or both. Give a short justification for why you asked this question. Make the questions {difficulty}."
        systemPrompt = f"Generate an interview question, to try and evaluate if the candidate is a good fit for the job based on the provided CV and job description. "


        #special case for first question
        if(len(session.questions))==0:
            response = client.chat.completions.create(
            model="qwen2.5-coder-7b-instruct",
            messages=[ 
                {"role": "system", "content": f"{systemPrompt} {catagoryString} This is not a followup question."},
                {"role": "user", "content":f"CV: {cv_as_string}"},
                {"role": "user", "content":f"Job Description: {job_description}"}
                ],
            temperature=0.7, 
            response_format=question_json_schema
            )
        else:
            plural = ""
            if(len(session.questions))>1:
                plural = "s"

            previous_questions_responses = []
            for question in session.questions:

                #If  question is passed in with no response a list index out of range error will happen here
                questionText = question.question_text
                print("QUESTION:",questionText)

                if question.user_response:
                    print("ANSWER:",question.user_response[0].text)
                    answerText = question.user_response[0].text
                    answerMessage = {"role": "user", "content": f"Candidate's Response to Previous Question: {answerText}"}
                else:
                    print("ANSWER: Not found")
                    answerMessage = {"role": "user", "content": f"Candidate's Response to Previous Question: Nothing Found"}

                # answerText = question.user_response[0].text
                questionMessage = {"role": "assistant", "content": f"Previous Question: {questionText}"}
                # answerMessage = {"role": "user", "content": f"Candidate's Response to Previous Question: {answerText}"}
                previous_questions_responses.extend([questionMessage,answerMessage])
                # previous_questions_responses.extend([questionMessage])


            print("UNPACK12___________________________________________________________________________________")
            print(*previous_questions_responses)
            print(questionMessage)
            print(answerMessage)

            response = client.chat.completions.create(
            model="qwen2.5-coder-7b-instruct",
            messages=[ 
                {"role": "system", "content": f"You are continuing an interview, consider the candidates response{plural} to previous question{plural}. Then choose to either a follow up question if you think more detail would help you make your decision, otherwise: {systemPrompt}. In either case, {catagoryString}"},
                {"role": "user", "content":f"CV: {cv_as_string}"},
                {"role": "user", "content":f"Job Description: {job_description}"},
                *previous_questions_responses
                ],
            temperature=0.7, 
            response_format=question_json_schema
            )


        return json.loads(response.choices[0].message.content)


