from flask import request, Response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from app.exts import db

from ..models.InterviewSessionQuestions import InterviewSessionQuestions;


question_link_ns = Namespace('questions', description='Question operations')

question_model = question_link_ns.model( "link",{
        "id": fields.String(readOnly=True, description="question ID"),
        "session_id": fields.String(required=True, description="sess_id"),
        "question_id": fields.String(required=True, description="q id"),
    }
)

def serialize_link(link):
    """Helper function to convert datetime to string"""
    return {
        'id': link.id,
        'session_id': link.session_id,
        'question_id': link.question_id,
    }


@question_link_ns.route('/questions/all')
class QuestionsAll(Resource):
    @question_link_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        """Get all sessions"""
        links = InterviewSessionQuestions.query.all()
        return [serialize_link(link) for link in links], 200
