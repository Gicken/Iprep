from flask import Flask
from flask_cors import CORS
from .routes import api_bp
from .exts import db, mail, migrate, jwt
from .config import config_dict, Config
from .commands import seed_db
from .routes.recovery import recovery_bp
from .job_description import init_job_description

def create_app(config_name="development"):
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Load configuration
    config_class = config_dict.get(config_name, Config)
    app.config.from_object(config_class)

    # Debugging: Print current config/checking to see which server i am using
    print(f"⚡ Running in {config_name} mode")
    
    # CORS POLICY TO ALLOW ALL ORIGINS, THIS IS IMPORTANT FOR SECURITY REASONS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app) 

    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/')
    app.register_blueprint(recovery_bp, url_prefix='/auth')

    # Initialize job description module
    init_job_description(app)

    return app