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
    'question_text': fields.String(required=True),
    'category': fields.String(required=True),
    'basis': fields.String(required=True),
    'justification':fields.String(required=True),
    'followup:':fields.Boolean(required=True),
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

def serialize_feedback(feedback):
        return {
            'id': feedback.id,
            'strength': feedback.feedbackStrength,
            'improve': feedback.feedbackImprove,
            'recommendation': feedback.feedbackRecommendation,
        }

def serialize_response(response):
        return {
            'id': response.id,
            'text': response.text,
            'feedback': [serialize_feedback(f) for f in response.feedback]
        }

def serialize_interview_question(question):
        return {
            'id': question.id,
            'question_text': question.question_text,
            'category': question.category,
            'basis':question.basis,
            'justification':question.justification,
            'followup:':question.followup,
            'response':[serialize_response(q) for q in question.user_response]
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

    @interview_ns.response(200, "Success")
    @interview_ns.response(401,"Unauthorized")
    @interview_ns.response(404,"Session not found")
    @interview_ns.response(500, "Internal Server Error")
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, session_id):
        """Delete session by ID"""
        current_user_id = get_jwt_identity()
        session = InterviewSession.query.filter_by(user_id=current_user_id, id=session_id).first()
        if not session:
            return {'error': 'Session not found or you do not have permission to access it'}, 404
        else:
            db.session.delete(session)
            db.session.commit()

            return {'message': 'Session has been deleted'}, 200
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
        """Start an interview session, including generating first question"""
        try:
            current_user_id = get_jwt_identity()
            data = request.get_json()

            if not data:
                return {"error": "No data provided"}, 400
            
            job_id = data.get("job_id")
            cv_id = data.get("cv_id")
            difficulty = data.get("difficulty")
            length = data.get("length")

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
                user_id=current_user_id,
                job_id=job_id,
                cv_id=cv_id,
                difficulty=difficulty,
                length = length
            )
            db.session.add(new_session)
            db.session.commit()

            # Generate first question
            questionDict = InterviewServices.generate_question(cv_string, job_desc, difficulty,new_session.id)

            #Add first question to the session
            first_question = InterviewQuestion(
                session_id=new_session.id,
                question_text=questionDict["questionText"],
                category=questionDict["questionCategory"],
                basis=questionDict["questionBasis"],
                justification=questionDict["justification"],
                followup=questionDict["followup"]
            )
            db.session.add(first_question)
            db.session.commit()

            
            return {
                'message': 'Session created successfully',
                'session_id': new_session.id
                # 'session_id': '9eb6c076-c323-4942-9129-df6f930a460d'
            }, 201

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500


@interview_ns.route('/continue/<string:session_id>')
class InterviewContinue(Resource):
    @interview_ns.response(201, "Success")
    @interview_ns.response(400, "Bad Request")
    @interview_ns.response(401, "Unauthorized")
    @interview_ns.response(404, "CV or Job description not found")
    @interview_ns.response(500, "Internal Server Error")
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def post(self,session_id):
        """Continue an interview session by generating a question"""
        try:
            
            current_user_id = get_jwt_identity()

            this_session = InterviewSession.query.get(session_id)

            if not this_session:
                return {"error": "Session not found"}, 404
            
            job_id = this_session.job_id
            cv_id = this_session.cv_id
            difficulty = this_session.difficulty
            length = this_session.length

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

            # Generate question
            questionDict = InterviewServices.generate_question(cv_string, job_desc, difficulty,session_id)

            #Add question to the session
            new_question = InterviewQuestion(
                session_id=this_session.id,
                question_text=questionDict["questionText"],
                category=questionDict["questionCategory"],
                basis=questionDict["questionBasis"],
                justification=questionDict["justification"],
                followup=questionDict["followup"]
            )
            db.session.add(new_question)
            db.session.commit()


            # InterviewServices.add_questions_to_session(questions, new_session.id)
            
            return {
                'message': 'Question created successfully',
                'question': new_question.id
            }, 201

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500



