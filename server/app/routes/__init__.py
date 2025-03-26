from flask import Blueprint
from flask_restx import Api
from .users import api as users_api
from .registration_routes import api as registration_api
from .auth import auth_ns as login_api
from .cv_routes import cv_ns as cv_api
from .jobdescription_routes import job_description_ns as jobdescription_api
from .recovery import api as recovery_api
from .feedback_routes import feedback_ns as feedback_api

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
api.add_namespace(cv_api, path='/cv')

# Add the Job description namespace to the API instance
api.add_namespace(jobdescription_api, path='/jobdescription')

# # Add the recovery namespace to the API instance
api.add_namespace(recovery_api, path='/recover')
# api.add_namespace(recovery_api, path='/recovery')

# Add the feedback namespace to the API instance
api.add_namespace(feedback_api, path='/feedback')