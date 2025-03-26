from flask import request, Response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage
from app.exts import db
from app.models.user import User
from ..models.CV import CV
from .cv_routes import CVItem

interview_ns = Namespace('interview', description='Interview operations')

interview_model = interview_ns.model(
    "start",{
        "cvID": fields.String(required=True, description="cvID"),
        "difficulty": fields.String(required=True, description="Difficulty")
    }
)


@interview_ns.route('/start')
class InterviewStart(Resource):
    @interview_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        print("Hello")