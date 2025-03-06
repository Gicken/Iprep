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
    app.config["JWT_SECRET_KEY"] = "your_secret_key"

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