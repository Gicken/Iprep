from flask import request, Response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.exts import db
from ..models.InterviewSession import InterviewSession;
from ..models.InterviewQuestion import InterviewQuestion;
from ..services.interview_services import InterviewServices;
import json

interview_ns = Namespace('interview_session', description='Interview operations')

##Schema for incoming questions
question_model = interview_ns.model("Question", {
    'question': fields.String(required=True),
    'questionBasis': fields.String(required=True),
})

questions_model = interview_ns.model("Questions", {
    'questions': fields.List(fields.Nested(question_model), required=True, min_items=1),
})

json_schema_model = interview_ns.model("JsonSchemaModel", {
    'name': fields.String(required=True),
    'schema': fields.Nested(questions_model, required=True),
})

interview_model = interview_ns.model( "session",{
        "job_id": fields.String(required=True, description="job_id"),
        "cv_id": fields.String(required=True, description="cv_id"),
        "difficulty": fields.String(required=True, description="Difficulty")
    }
)




def serialize_session(session):
    """Helper function to convert datetime to string"""
    return {
        'id': session.id,
        'job_id': session.job_id,
        'cv_id': session.cv_id,
        'user_id': session.user_id,
    }
@interview_ns.route('/start')
class InterviewStart(Resource):
    @interview_ns.doc(security='BearerAuth')
    @interview_ns.expect(interview_model)
    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()

        data = request.json
        new_session = InterviewSession(
            job_id=data["job_id"],
            cv_id=data["cv_id"],
            difficulty = data["difficulty"],
            user_id=current_user_id
        )
        db.session.add(new_session)
        db.session.commit()

        authorization_header = request.headers.get('Authorization')
        _, token = authorization_header.split()
        cvString = InterviewServices.read_cv_doc(token,data["cv_id"])
        questions = InterviewServices.generate_questions(cvString,data["difficulty"])
        InterviewServices.add_questions_to_session(token,questions,new_session.id)
        
        return {
                    'message': 'Session created successfully', 
                    'session_id': new_session.id
                }, 201


@interview_ns.route('/all')
class InterviewAll(Resource):
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        """Get all sessions"""
        sessions = InterviewSession.query.all()
        return [serialize_session(session) for session in sessions], 200


@interview_ns.route('/<string:session_id>/questions')
class InterviewStart(Resource):
    @interview_ns.doc(security='BearerAuth')
    @interview_ns.expect(questions_model)
    @jwt_required()
    def post(self,session_id):
        current_user_id = get_jwt_identity()
        data = json.loads(request.json)
        session = InterviewSession.query.get(session_id)

        # if True:
        if not data["questions"]:
            print(data)
            return {"error": "No questions provided"}, 400
        
        for questionData in data["questions"]:
            new_question = InterviewQuestion(
                question_text=questionData["question"],
                category=questionData["questionBasis"]
            )
            
            db.session.add(new_question)
            db.session.flush()
            session.questions.append(new_question)  # This automatically adds to the link table


        db.session.commit()

        return {
                    'message': 'Questions added successfully', 
                    'session_id': session_id,
                }, 201