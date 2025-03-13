#This File will centralize configuration settings for different environments.
import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    """Base configuration"""
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password123@localhost:3306/iprepdb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Basic configurations for Flask
    SECRET_KEY = 'your-secret-key'

    # Flask-Mail configuration
    MAIL_SERVER = 'smtp.gmail.com'  # Replace with your email provider
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'your-email@example.com'
    MAIL_PASSWORD = 'your-email-password'  # or better, use environment variables for sensitive data
    MAIL_DEFAULT_SENDER = 'your-email@example.com'

class DevelopmentConfig(Config):
    """Development environment config."""
    DEBUG = True
    ENV = 'development'

class TestingConfig(Config):
    """Testing environment config."""
    TESTING = True
    ENV = 'testing'

class ProductionConfig(Config):
    """Production environment config."""
    DEBUG = False
    ENV = 'production'

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")

class ProductionConfig(Config):
    """Production configuration"""
    pass

#We can also put testing config if we want to

#Dictionary to map environment variables
config_dict = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    #tesing as well
}

