from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api
from flask_jwt_extended import JWTManager
import logging
import os
from flask_mail import Mail


db = SQLAlchemy()
api = Api()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()

LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# set up logging configuration
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    handlers=[
        logging.FileHandler(os.path.join(LOG_DIR, "app.log")),
        logging.StreamHandler()
    ]
)



logger = logging.getLogger("FlaskAPI")