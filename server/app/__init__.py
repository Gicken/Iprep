from flask import Flask
from app.routes import api_bp
from .exts import db, migrate, jwt, mail
from .config import config_dict
from .commands import seed_db
from flask_cors import CORS
# from .config import MAIL_SERVER, MAIL_PORT, MAIL_USE_TLS, MAIL_USERNAME, MAIL_PASSWORD
from .config import Config
# from .utils import mail
# from utils import mail
import os

def create_app(config_name="development"):
    app = Flask(__name__)
    
    # Load the correct config
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)

    # Ensure the required database URI is set
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("Missing SQLALCHEMY_DATABASE_URI configuration!")

    # Debugging: Print current config mode
    print(f"⚡ Running in {config_name} mode")
    
    # CORS POLICY TO ALLOW ALL ORIGINS, THIS IS IMPORTANT FOR SECURITY REASONS
    CORS(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # JWT Secret Key
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_secret_key")

    # File Upload Configuration
    app.config["UPLOAD_FOLDER"] = os.getenv("UPLOAD_FOLDER", "./uploads")

    mail = Mail(app)

    # Register the seed command
    app.cli.add_command(seed_db)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)

    # Register Flask commands
    app.cli.add_command(seed_db)

    # MailHog SMTP configuration (for testing emails)
    app.config['MAIL_SERVER'] = 'localhost'
    app.config['MAIL_PORT'] = 1025
    app.config['MAIL_USE_TLS'] = False
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = ''
    app.config['MAIL_PASSWORD'] = ''
    app.config['MAIL_DEFAULT_SENDER'] = 'noreply@yourdomain.com'

    # Register Flask-RESTX API
    api.init_app(app)
    api.add_namespace(recovery_bp, path='/recovery')

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