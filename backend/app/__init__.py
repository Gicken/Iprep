from flask import Flask, jsonify
from app.routes import api_bp
from .exts import db, migrate, jwt
from .config import config_dict
from .commands import seed_db
from flask_cors import CORS
from .routes.cv_routes import cv_ns  # Import the CV namespace
from flask_restx import Api
import os

def create_app(config_name="development"):
    app = Flask(__name__)
    cors = CORS(app, origins='*')

    # Load the appropriate configuration class
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)
    app.config["JWT_SECRET_KEY"] = "your_secret_key"

    # Configure upload folder
    app.config['UPLOAD_FOLDER'] = os.path.join(app.instance_path, 'uploads')
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Register the seed command
    app.cli.add_command(seed_db)
    
    # Initialize database and migrations
    migrate.init_app(app, db)
    
    jwt.init_app(app)
    
    # Initialize the database
    db.init_app(app)

    # Modify the existing API blueprint to add CV namespace
    api = Api(app, version='1.0', title='Your API', 
              description='API for CV Management')
    api.add_namespace(cv_ns, path='/api/cv')
    
    # Register the Flask-RESTX API instance (with the Swagger UI)
    app.register_blueprint(api_bp, url_prefix='/')

    # Return the app instance
    return app