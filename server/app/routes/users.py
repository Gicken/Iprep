from flask_restx import Namespace, Resource, fields
from flask import request
from ..models.user import User
from ..exts import db, logger
from flask_jwt_extended import jwt_required
import uuid

# Define the user namespace
api = Namespace('users', description='User related operations')

# Define the user model for API responses (used for Swagger docs)
user_model = api.model('User', {
    'id': fields.String(readOnly=True, description='User ID'),
    'firstName': fields.String(required=True, description='First name of the user'),
    'lastName': fields.String(required=True, description='Last name of the user'),
    'email': fields.String(required=True, description='Email of the user'),
    'role': fields.String(required=True, description='Role of the user'),
    'createdAt': fields.DateTime(readOnly=True, description='User creation timestamp'),
    'updatedAt': fields.DateTime(readOnly=True, description='User update timestamp'),
})

def serialize_user(user):
    """Helper function to convert datetime to string"""
    return {
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
        'email': user.email,
        'role': user.role,
        'createdAt': user.createdAt.strftime('%Y-%m-%dT%H:%M:%S') if user.createdAt else None,
        'updatedAt': user.updatedAt.strftime('%Y-%m-%dT%H:%M:%S') if user.updatedAt else None,
    }

@api.route('/')
class UserList(Resource):
    """Handles GET and POST requests for users"""

    @jwt_required()
    @api.doc(security='BearerAuth')
    def get(self):
        """Get all users"""
        logger.debug("Fetching all users from database")
        users = User.query.all()
        logger.info(f"Retrived {len(users)} users")
        return [serialize_user(user) for user in users], 200