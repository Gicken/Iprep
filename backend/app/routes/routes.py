from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from app.models.user import User, db
from app import bcrypt
import re

# Define API namespace for users
api = Namespace("User", description="User related operations")

# Define user model for Swagger UI
user_model = api.model('User', {
    'firstName': fields.String(required=True, description="First Name"),
    'lastName': fields.String(required=True, description="Last Name"),
    'email': fields.String(required=True, description="Email Address"),
    'password': fields.String(required=True, description="Password"),
    'confirmPassword': fields.String(required=True, description="Confirm Password"),
})

# Email validation function
def is_valid_fdm_email(email):
    return bool(re.match(r"^[a-zA-Z0-9._%+-]+@(fdm\.com|fdmgroup\.com)$", email))

# Password validation function
def is_valid_password(password):
    return len(password) >= 8 and bool(re.search(r"[!@#$%^&*(),.?\":{}|<>]", password))

@api.route('/register')
class RegisterUser(Resource):
    @api.expect(user_model)
    def post(self):
        """Register a new user"""
        data = request.json
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # Validate input data
        if not first_name or not last_name:
            return {"error": "First name and last name are required."}, 400
        if not is_valid_fdm_email(email):
            return {"error": "Please use a valid FDM email address."}, 400
        if not is_valid_password(password):
            return {"error": "Password must be at least 8 characters long and include one special character."}, 400
        if password != confirm_password:
            return {"error": "Passwords do not match."}, 400

        # Hash the password
        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        # Create the user object
        user = User(firstName=first_name, lastName=last_name, email=email, password=password_hash)

        # Add user to the database and commit
        try:
            db.session.add(user)
            db.session.commit()

            return {
                "message": "User registered successfully!",
                "user_id": user.id,
                "email": user.email
            }, 201

        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500
