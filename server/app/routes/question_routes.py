from flask import request, Response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.exts import db
from ..models.InterviewQuestion import InterviewQuestion;

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
        """Get all sessions"""
        sessions = InterviewQuestion.query.all()
        return [serialize_question(question) for question in sessions], 200
    