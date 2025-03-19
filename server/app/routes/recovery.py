# from flask import Blueprint, request, jsonify, url_for
# from flask_mail import Message
# import jwt
# import datetime
# from app.exts import mail
# from app.models import user 

# # Blueprint for recovery routes
# recovery_bp = Namespace('recovery', description='password recovery')

# # Model for receiving email data
# recovery_model = recovery_bp.model("User", {
#     'email': fields.String(required=True, description='Email address to send reset link')
# })

# # Model for receiving email and password data for reset
# reset_password_model = recovery_bp.model("ResetPassword", {
#     'email': fields.String(required=True, description='Email address for password reset'),
#     'password': fields.String(required=True, description='New password')
# })

# # Route to initiate password recovery (send the reset link as a response)
# @recovery_bp.route('/')
# class recover_password(Resource):
#     @recovery_bp.expect(recovery_model)
#     def post(self):
#         data = request.get_json()
#         email = data.get('email')
        
#         # Check if user exists in the database
#         user = User.query.filter_by(email=email).first()
#         if user:
#             # Only send the message without reset link
#             return {
#                 'message': 'Email found. Redirecting you to password reset link.'
#             }, 200
        
#         return {'error': 'Email not found'}, 404

# @recovery_bp.route('/reset/<token>', methods=['POST'])
# def reset_password(token):
#     try:
#         payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
#         email = payload['email']
#         if email in users:
#             data = request.get_json()
#             new_password = data.get('password')
#             return jsonify({'message': 'Password has been reset'}), 200
#         return jsonify({'error': 'Invalid token'}), 400
#     except jwt.ExpiredSignatureError:
#         return jsonify({'error': 'Token has expired'}), 400
#     except jwt.InvalidTokenError:
#         return jsonify({'error': 'Invalid token'}), 400

from flask import request, url_for, current_app
from flask_restx import Namespace, Resource, fields
import jwt
import datetime
from werkzeug.security import generate_password_hash
from app.exts import db, logger
from ..models.user import User
from ..utils.send_email import send_email

# Blueprint for recovery routes
api = Namespace('recovery', description='Password recovery')

# URL for the reset password, might change 
FRONTEND_URL = "http://localhost:5173/reset"

# Models
recovery_model = api.model("RecoverUser", {
    'email': fields.String(required=True, description='Email address for reset link')
})

reset_password_model = api.model("ResetPassword", {
    'token': fields.String(required=True, description='Reset token'),
    'password': fields.String(required=True, description='New password')
})

# Generate password reset token
def generate_reset_token(email):
    payload = {
        "email": email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # 1-hour expiry
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

# Verify password reset token
def verify_reset_token(token):
    try:
        payload = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        return payload["email"]
    except jwt.ExpiredSignatureError:
        return None  # Token expired
    except jwt.InvalidTokenError:
        return None  # Invalid token

# Route to initiate password recovery
@api.route('/')
class RecoverPassword(Resource):
    @api.expect(recovery_model)
    def post(self):
        data = request.get_json()
        email = data.get('email')

        # Check if user exists
        user = User.query.filter_by(email=email).first()
        if not user:
            return {'error': 'Email not found'}, 404

        # Generate reset token
        token = generate_reset_token(email)
        reset_link = f"{FRONTEND_URL}?token={token}"
        # reset_linkt = url_for('api.recovery_reset_password', token=token, _external=True)

        # Send email
        subject = "Password Reset Request"
        body = f"Click the link below to reset your password:\n{reset_link}\n\nIf you did not request a password reset, please ignore this email"
        send_email(email, subject, body)

        return {
            'message': 'Reset link sent to your email',
            'reset_link': reset_link,
            'reset_token': token
            }, 200

# Route to reset password
@api.route('/reset-password')
class ResetPassword(Resource):
    @api.expect(reset_password_model)
    def post(self):
        data = request.get_json()
        token = data.get('token')
        new_password = data.get('password')
        # logger.info(f"Resetting password: token={token}, new_password={new_password}")

        # Verify token
        email = verify_reset_token(token)
        # logger.info(f"Reset password Email: ", {email})
        if not email:
            return {'error': 'Invalid or expired token'}, 400

        # Update password securely
        user = User.query.filter_by(email=email).first()
        if user:
            # logger.info(f"User exists, reseting password for, ", {user});
            user.password = new_password  # Hashing password
            db.session.commit()
            return {'message': 'Password reset successfully'}, 200

        return {'error': 'User not found'}, 404
    
@api.route('/validate_token/<string:token>')
class ValidateToken(Resource):
    def get(self, token):
        email = verify_reset_token(token)
        if email:
            return {'message': 'Token is valid'}, 200
        return {'error': 'Invalid or expired token'}, 400

