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
    @auth_ns.response(404, "Not Found")
    @auth_ns.response(500, "Internal Server Error")
    def post(self):
        """Handles user authentication and return a JWT token"""
        try:
            data = request.json
            logger.info(f"Login data: {data}")

            if not data or "email" not in data or "password" not in data:
                return {"Error": "Missing email or password"}, 400

            user = User.query.filter_by(email=data["email"]).first()

            if not user:
                return {"Error": "User with this email does not exist"}, 404

            if not user.check_password(data["password"]):
                return {"Error": "Invalid email or password"}, 401

            access_token = generate_jwt_token(user)

            return {
                "message": "Logged in successfully",
                "access_token": access_token
            }, 200
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return {"Error": "Internal Server Error"}, 500