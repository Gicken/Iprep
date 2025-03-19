#This File will centralize configuration settings for different environments.
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration"""
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}
    
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() in ["true", "1"]
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = MAIL_USERNAME

    if not MAIL_USERNAME or not MAIL_PASSWORD:
        raise ValueError("MAIL_USERNAME and MAIL_PASSWORD must be set in environment variables.")

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

class ProductionConfig(Config):
    """Production configuration"""
    pass

class TestingConfig(Config):
    """Testing configuration"""
    TESTING = True
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_TESTING_URI")

# Dictionary to map environment variables
config_dict = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig
}

# Select the correct environment configuration
FLASK_ENV = os.getenv("FLASK_ENV", "development").lower()
ConfigClass = config_dict.get(FLASK_ENV, DevelopmentConfig)


