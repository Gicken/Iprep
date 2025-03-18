from flask import Flask
from flask_cors import CORS
from flask_mail import Mail
from flask_restx import Api
from .routes.recovery import recovery_bp  # Import the recovery namespace
import os

mail = Mail()  # Initialize Mail here
api = Api()  # Initialize Flask-RESTX API

def create_app(config_name="development"):
    app = Flask(__name__)
    
    # Load the correct configuration
    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)

    # Ensure the required database URI is set
    if not app.config.get("SQLALCHEMY_DATABASE_URI"):
        raise RuntimeError("Missing SQLALCHEMY_DATABASE_URI configuration!")

    # Debugging: Print current config mode
    print(f"⚡ Running in {config_name} mode")
    
    # CORS POLICY
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
    app.register_blueprint(recovery_bp, url_prefix='/auth')

    # Initialize job description module
    init_job_description(app)

    return app