from flask import Flask
from app.routes import api_bp
from .exts import db, migrate, jwt, mail
from .config import config_dict
from .commands import seed_db
from flask_cors import CORS
from .config import Config
from datetime import datetime, date
import os

# custom json encoder function to format date time
def custom_json_encoder(obj):
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
        # return obj.strftime('%Y-%m-%d %H:%M:%S')
    raise TypeError(f"Type {type(obj)} not serializable")

def create_app(config_name="development"):
    app = Flask(__name__)
    
    # Auto convert datetime object in Flask Globally
    app.json_encoder = custom_json_encoder
    
    # Load the correct config
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)

    # Debugging: Print current config mode
    print(f"⚡ Running in {config_name} mode")
    
    # CORS POLICY TO ALLOW ALL ORIGINS, THIS IS IMPORTANT FOR SECURITY REASONS
    # CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    
    # Register the seed command
    app.cli.add_command(seed_db)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register Flask commands
    app.cli.add_command(seed_db)

    # Register Blueprints
    app.register_blueprint(api_bp, url_prefix='/')
    
    app.config.update(
    MAIL_SERVER=Config.MAIL_SERVER,
    MAIL_PORT=Config.MAIL_PORT,
    MAIL_USE_TLS=Config.MAIL_USE_TLS,
    MAIL_USERNAME=Config.MAIL_USERNAME,
    MAIL_PASSWORD=Config.MAIL_PASSWORD)

    mail.init_app(app)
    
    # Return the app instance
    return app