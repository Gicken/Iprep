from flask import request, Response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.exts import db
from ..models.InterviewQuestion import InterviewQuestion;
from ..models.UserResponse import UserResponse;
from ..models.Feedback import Feedback;


# from ..models.InterviewSessionQuestions import InterviewSessionQuestions;


question_ns = Namespace('questions', description='Question operations')

question_model = question_ns.model( "question",{
        "id": fields.String(readOnly=True, description="question ID"),
        "question_text": fields.String(required=True, description="question_text"),
        "category": fields.String(required=True, description="question cat"),
        "created_at": fields.DateTime(required=True, description="creation time")
    }
)

def serialize_question(serialize_question):
    """Helper function to convert datetime to string"""
    return {
        'id': serialize_question.id,
        'question_text': serialize_question.question_text,
        'category': serialize_question.category,
        'created_at': serialize_question.created_at.strftime('%Y-%m-%dT%H:%M:%S') if serialize_question.created_at else None,
    }


@question_ns.route('/all')
class QuestionsAll(Resource):
    @question_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        """Get all questions"""
        sessions = InterviewQuestion.query.all()
        return [serialize_question(question) for question in sessions], 200
    

@question_ns.route('/<string:question_id>')
class QuestionDel(Resource):
    @question_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, question_id):
        """Del question by ID"""
        question = InterviewQuestion.query.filter_by(id=question_id).first()
        if not question:
            return {'error': 'Question not found or you do not have permission to access it'}, 404
        else:
            db.session.delete(question)
            db.session.commit()
            return {'message': 'Question deleted'}, 200
        

@question_ns.route('/response/<string:response_id>')
class ReponseDel(Resource):
    @question_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, response_id):
        """Del response by ID"""
        response = UserResponse.query.filter_by(id=response_id).first()
        if not response:
            return {'error': 'Response not found or you do not have permission to access it'}, 404
        else:
            db.session.delete(response)
            db.session.commit()
            return {'message': 'Response deleted'}, 200
        
@question_ns.route('/feedback/<string:feedback_id>')
class ReponseDel(Resource):
    @question_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, feedback_id):
        """Del feedback by ID"""
        response = Feedback.query.filter_by(id=feedback_id).first()
        if not response:
            return {'error': 'feedback not found or you do not have permission to access it'}, 404
        else:
            db.session.delete(response)
            db.session.commit()
            return {'message': 'feedback deleted'}, 200