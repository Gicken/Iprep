from flask import request, jsonify
from ..utils.jwt_handler import generate_jwt_token
from flask_restx import Namespace, Resource, fields
from ..models.user import User
from ..exts import logger

# Define the user namespace
auth_ns = Namespace('auth', description='User login operations')

# Define a request model for documation
login_model = auth_ns.model(
    "login",{
        "email": fields.String(required=True, description="User's email"),
        "password": fields.String(required=True, description="User's password")
    }
)

# Define response model
response_model = auth_ns.model(
    "AuthResponse",{
        "message": fields.String(description="Response message"),
        "access_token": fields.String(description="Access token"),
    }
)

# Create a route to authenticate your users and return JWTs
@auth_ns.route('/login')
class LoginResource(Resource):
    @auth_ns.expect(login_model)
    @auth_ns.response(200, "Success", response_model)
    @auth_ns.response(400, "Bad Request")
    @auth_ns.response(401, "Unauthorized")
    def post(self):
        """Handles user authentication and return a JWT token"""
        data = request.json
        # log data
        logger.info(f"Login data: {data}")
        
        # Make sure email and password are provided
        if not data or "email" not in data or "password" not in data:
            return {"Error": "Missing email or password"}, 400
        
        # fetch user by their email
        user = User.query.filter_by(email=data["email"]).first()
        
        # log the fetched user
        logger.info(f"Fetched user: {user.firstName}")
        
        # log the user
        logger.info(f"Eetched User email: {user.email}")

        if not user:
            return {"Error": "User with this email does not exist"}, 404
        
        # log the check_password function answer
        logger.info(f"Password check result: {user.check_password(data['password'])}")
        
        if not user.check_password(data["password"]):
            return {"Error": "Invalid email or password"}, 401
        # Generate JWT token
        access_token = generate_jwt_token(user)
        
        # Return a success message and the token
        return {
            "message": "Logged in successfully", 
            "access_token": access_token
            }, 200