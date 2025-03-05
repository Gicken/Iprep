

from flask import Blueprint
from flask_restx import Namespace, Api
from .users import api as users_api
from .auth import auth_ns as login_api

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

