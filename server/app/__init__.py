from flask import Flask, jsonify
from app.routes import api_bp
from .exts import db, migrate, jwt
from .config import config_dict
from .commands import seed_db
from flask_cors import CORS
# from flask_mail import Mail
# from .routes.recovery import recovery_bp
from .config import Config
import os
from flask_mail import Mail

def create_app(config_name="development"):
    app = Flask(__name__)
    # CORS(app, origins='*')
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Load the appropriate configuration class
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)
    app.config["JWT_SECRET_KEY"] = "your_secret_key"
    app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER")

    app.config['MAIL_SERVER'] = 'smtp.example.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'your_email@example.com'
    app.config['MAIL_PASSWORD'] = 'your_password'
    app.config['MAIL_DEFAULT_SENDER'] = 'your_email@example.com'

    mail = Mail(app)


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