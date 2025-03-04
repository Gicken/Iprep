from app.models.user import User
from app.exts import db
from app.utils.jwt_handler import generate_jwt_token
from werkzeug.security import check_password_hash

class AuthService:
    @staticmethod
    def authenticate_user(email, password):
        """Authenticate a user by verifying email and password."""
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            #Generate JWT token
            token = generate_jwt_token(user)
            return {"token": token, "user":user}
        return None