#This File will centralize configuration settings for different environments.

import os
from dotenv import load_dotenv

#Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration"""
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///dev.db")

class ProductionConfig(Config):
    """Production configuration"""
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///prod.db")
    DEBUG = False

#We can also put testing config if we want to

#Dictionary to map environment variables
config_dict = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    #tesing as well
}