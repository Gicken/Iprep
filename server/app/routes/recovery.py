from flask import Blueprint, request, jsonify, url_for, current_app
from flask_restx import Namespace, Resource, fields
from werkzeug.security import generate_password_hash
from ..models.user import User
from ..exts import db

# Blueprint for recovery routes
recovery_bp = Namespace('recovery', description='password recovery')

# Model for receiving email data
recovery_model = recovery_bp.model("User", {
    'email': fields.String(required=True, description='Email address to send reset link')
})

# Model for receiving email and password data for reset
reset_password_model = recovery_bp.model("ResetPassword", {
    'email': fields.String(required=True, description='Email address for password reset'),
    'password': fields.String(required=True, description='New password')
})

# Route to initiate password recovery (send the reset link as a response)
@recovery_bp.route('/')
class recover_password(Resource):
    @recovery_bp.expect(recovery_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        
        # Check if user exists in the database
        user = User.query.filter_by(email=email).first()
        if user:
            # Only send the message without reset link
            return {
                'message': 'Email found. Redirecting you to password reset link.'
            }, 200
        
        return {'error': 'Email not found'}, 404


@recovery_bp.route('/reset-password')
class ResetPassword(Resource):
    @recovery_bp.expect(reset_password_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(password)
            db.session.commit()
            return {'message': 'Password has been successfully reset'}, 200
        return {'error': 'Email not found'}, 404
