from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_restx import Api  
from .config import config_dict

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app(config_name="development"):
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(config_dict[config_name])

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    CORS(app, resources={r"/*": {"origins": "*"}}) 

    # Initialize Flask-RESTx API
    api = Api(app, title="User API", version="1.0", description="API for User Management")

    # Register routes (Blueprints)
    from .routes.routes import api as user_namespace
    api.add_namespace(user_namespace, path="/user")

    return app
