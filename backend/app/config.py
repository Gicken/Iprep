# backend/app/config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class."""
    SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DB_HOST = os.getenv("DB_HOST")
    DB_PORT = os.getenv("DB_PORT", 3306)
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_NAME}"

class ProductionConfig(Config):
    """Production configuration."""
    SQLALCHEMY_DATABASE_URI = f"mysql+mysqlconnector://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_NAME}"
    DEBUG = False

config_dict = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
}
