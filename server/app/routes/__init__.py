from flask import Blueprint
from flask_restx import Namespace, Api
from .users import api as users_api
from .registration_routes import api as registration_api
from .auth import auth_ns as login_api
from flask_cors import CORS
from flask_mail import Mail
from .routes.recovery import recovery_bp
from .config import Config

# Initialize the API instance
api_bp = Blueprint('api', __name__)
CORS(api_bp, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)

# Register the recovery blueprint
app.register_blueprint(recovery_bp, url_prefix='/auth')