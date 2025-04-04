from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.exts import db
from ..models.InterviewSession import InterviewSession;
from ..models.InterviewQuestion import InterviewQuestion;
from ..services.interview_services import InterviewServices;
from ..services.JobDescriptionService import JobDescriptionService;
from flask import jsonify

interview_ns = Namespace('interview_session', description='Interview operations')

question_model = interview_ns.model("Question", {
    'question': fields.String(required=True),
    'questionBasis': fields.String(required=True),
})

interview_session_model = interview_ns.model( "session",{
        "job_id": fields.String(required=True, description="job_id"),
        "cv_id": fields.String(required=True, description="cv_id"),
        "difficulty": fields.String(required=True, description="Difficulty"),
        "length": fields.Integer(required=True, description="number of questions")
    }
)

interview_session_model_response = interview_ns.model( "session_response",{
        "id": fields.String(required=True, description="session_id"),
        "job_id": fields.String(required=True, description="job_id"),
        "cv_id": fields.String(required=True, description="cv_id"),
        "difficulty": fields.String(required=True, description="Difficulty"),
        "length": fields.Integer(required=True, description="number of questions"),
        "questions": fields.List(fields.Nested(question_model), required=True, min_items=1)
    }
)



def serialize_response(response):
        return {
            'id': response.id,
            'text': response.text

        }

def serialize_interview_question(question):
        return {
            'id': question.id,
            'question_text': question.question_text,
            'category': question.category,
            'response':[serialize_response(q) for q in question.user_response]
            # 'response': serialize_response(question.user_response)
            # 'response': question.user_response.__dict__

        }

# JobDescriptionService.get_job_description_by_id(current_user_id,data["job_id"]).to_dict()
def serialize_session(session):
    """Helper function to convert datetime to string"""
    return {
        'id': session.id,
        'job_id': session.job_id,
        'cv_id': session.cv_id,
        'user_id': session.user_id,
        'length': session.length,
        'questions': [serialize_interview_question(q) for q in session.questions]
    }



@interview_ns.route('/')
class InterviewAll(Resource):
    @interview_ns.response(200, "Success",[interview_session_model_response])
    @interview_ns.response(401,"Unauthorized")
    @interview_ns.response(500, "Internal Server Error")
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        """Get all sessions for current user"""
        current_user_id = get_jwt_identity()
        sessions = InterviewSession.query.filter_by(user_id=current_user_id).options(db.joinedload(InterviewSession.questions)).all()
        return [serialize_session(session) for session in sessions], 200

@interview_ns.route('/<string:session_id>')
class InterviewItem(Resource):
    @interview_ns.response(200, "Success",interview_session_model_response)
    @interview_ns.response(401,"Unauthorized")
    @interview_ns.response(404,"Session not found")
    @interview_ns.response(500, "Internal Server Error")
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self, session_id):
        """Get session by ID"""
        current_user_id = get_jwt_identity()
        session = InterviewSession.query.filter_by(user_id=current_user_id, id=session_id).first()

        if not session:
            return {'error': 'Session not found or you do not have permission to access it'}, 404

        return serialize_session(session), 200
@interview_ns.route('/start')
class InterviewStart(Resource):
    @interview_ns.response(201, "Success")
    @interview_ns.response(400, "Bad Request")
    @interview_ns.response(401, "Unauthorized")
    @interview_ns.response(404, "CV or Job description not found")
    @interview_ns.response(500, "Internal Server Error")
    @interview_ns.doc(security='BearerAuth')
    @interview_ns.expect(interview_session_model)
    @jwt_required()
    def post(self):
        """Start an interview session, including generating questions"""
        try:
            current_user_id = get_jwt_identity()
            data = request.get_json()

            if not data:
                return {"error": "No data provided"}, 400
            
            job_id = data.get("job_id")
            cv_id = data.get("cv_id")
            difficulty = data.get("difficulty")

            if not all([job_id, cv_id, difficulty]):
                return {"error": "Missing required fields"}, 400
            
            # Validate CV existence
            cv_string = InterviewServices.read_cv_doc(cv_id)
            if cv_string == "CV not found":
                return {"error": "CV not found"}, 404

            # Validate Job Description existence
            job_desc_obj = JobDescriptionService.get_job_description_by_id(current_user_id, job_id)
            if not job_desc_obj:
                return {"error": "Job description not found"}, 404
            
            job_desc = job_desc_obj.to_dict()
            
            # Create interview session
            new_session = InterviewSession(
                job_id=job_id,
                cv_id=cv_id,
                difficulty=difficulty,
                user_id=current_user_id
            )
            db.session.add(new_session)
            db.session.commit()

            # Generate questions
            questions = InterviewServices.generate_questions(cv_string, job_desc, difficulty)
            InterviewServices.add_questions_to_session(questions, new_session.id)
            
            return {
                'message': 'Session created successfully',
                'session_id': new_session.id
                # 'session_id': '0d17e3c0-f872-484c-af1f-088b0bcabefd'
            }, 201

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500



