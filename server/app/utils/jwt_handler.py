from datetime import datetime, timedelta
from flask import current_app
from app.exts import jwt
from flask_jwt_extended import create_access_token, decode_token

def generate_jwt_token(user):
    """Generate a JWT token with a payload using jwt_extended"""
    additional_claims = {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "firstName": user.firstName,
        "lastName": user.lastName
    }
    token=create_access_token(
        identity=user.id, 
        additional_claims=additional_claims,
        expires_delta=timedelta(minutes=30))
    return token

def decode_jwt_token(token):
    """Decode a JWT token using jwt_extended"""
    try:
        payload = decode_token(token)
        return payload
    except Exception as e:
        return {"Error": str(e)}
