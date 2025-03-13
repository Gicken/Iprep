#This File will centralize configuration settings for different environments.
import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    """Base configuration"""
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your_email@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your_password') 

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

class ProductionConfig(Config):
    """Production configuration"""
    pass

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_TESTING_URI")
    SQLALCHEMY_ENGINE_OPTIONS = {"pool_pre_ping": True}
    DEBUG = False

#Dictionary to map environment variables
config_dict = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig
}

