from flask import Flask
from flask_restx import Api
from config import config_dict
from flask_mail import Mail, Message
from .routes.recovery import recovery_bp  # Import the recovery namespace
from flask import Flask
from .exts import db, mail  # Import db and mail from exts

# Initialize Flask app
app = Flask(__name__)

# Load configuration
env = "development"  # Change based on your environment
app.config.from_object(config_dict[env])

# Initialize extensions
db.init_app(app)
mail.init_app(app)

# MailHog SMTP configuration
app.config['MAIL_SERVER'] = 'localhost'  # MailHog SMTP server
app.config['MAIL_PORT'] = 1025  # MailHog SMTP port
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_DEFAULT_SENDER'] = 'noreply@yourdomain.com'  # Default sender email

# Initialize Flask-RESTx API
api = Api(app)

# Register Namespaces
api.add_namespace(recovery_bp, path='/recovery')

if __name__ == '__main__':
    app.run(debug=True)

