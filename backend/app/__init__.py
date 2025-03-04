from flask import Flask, jsonify
from app.routes import api_bp
from .exts import db, migrate, jwt
from .config import config_dict
from .commands import seed_db
from flask_cors import CORS

def create_app(config_name="development"):
    app = Flask(__name__)
    cors = CORS(app, origins='*')

    # Load the appropriate configuration class
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)
    app.config["JWT_SECRET_KEY"] = "your_secret_key"


    # Register the seed command
    app.cli.add_command(seed_db)
    
    # Initialize database and migrations
    migrate.init_app(app, db)
    
    jwt.init_app(app)
    
    # Initialize the database
    db.init_app(app)
    
    # Register the Flask-RESTX API instance (with the Swagger UI)
    app.register_blueprint(api_bp, url_prefix='/')

    # Return the app instance
    return app