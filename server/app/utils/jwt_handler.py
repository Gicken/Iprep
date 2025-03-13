from datetime import timedelta
from flask_jwt_extended import create_access_token, decode_token
from flask_jwt_extended import exceptions
from flask import jsonify

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
        expires_delta=timedelta(minutes=30),
        fresh=True
        )
    return token

def decode_jwt_token(token):
    """Decode a JWT token using jwt_extended"""
    try:
        payload = decode_token(token)
        return payload
    except exceptions.JWTDecodeError:
        return jsonify({"message": "An Error occured while decoding you JWT"}), 401
    except exceptions.NoAuthorizationError:
        return jsonify({"message": "No token provided"}), 401
    except exceptions.JWTExtendedException as je:
        return jsonify({"message": "There was an error with your token", "Error": str(je)}), 401
    except Exception as e:
        return jsonify({"message": "There was an error while decoding token", "error": str(e)}), 401
