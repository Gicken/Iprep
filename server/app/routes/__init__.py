from flask import Blueprint
from flask_restx import Namespace, Api
from .users import api as users_api
from .registration_routes import api as registration_api
from .auth import auth_ns as login_api
from .cv_routes import cv_ns as cv_api  # Add this import
from flask_cors import CORS
from .recovery import recovery_bp
# from flask_mail import Mail
# from .routes.recovery import recovery_bp
# from .config import Config

# Initialize the API instance
api_bp = Blueprint('api', __name__)


security_scheme = {
    'BearerAuth':
        {
        'type': 'apiKey',
        'in': 'header',
        'name': 'Authorization',
        }
    }

api = Api(
    api_bp, 
    version='1.0',
    description="The iprep interview API",
    security='BearerAuth',
    authorizations=security_scheme,
    doc="/"
    )

# Add the users namespace to the API instance
api.add_namespace(users_api, path='/users')

# Add the login namespace to the API instance
api.add_namespace(login_api, path='/auth')

# Add the registration namespace to the API instance
api.add_namespace(registration_api, path='/register')

# Add the CV namespace to the API instance
api.add_namespace(cv_api, path='/cv')  # Add this line

# Add the CV namespace to the API instance
api.add_namespace(recovery_bp, path='/recovery')  # Add this line