from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from .config import config_dict
from flask_restx import Api, Resource

#Initialize extensions
# db = SQLAlchemy()
# migrate = Migrate()

def create_app(config_name="development"):
    app = Flask(__name__)

    config_class = config_dict.get(config_name, "development")
    app.config.from_object(config_class)

    # db.init_app(app)
    # migrate.init_app(app, db)
    # CORS(app) 

    #initialize API
    api = Api(app, version='1.0', title='I-Prep API', description="API for AI-driven interviews")

    #register namespaces
    from .routes.routes import ns_hello
    api.add_namespace(ns_hello, path="/api/hello")

    # Register blueprints as well if we want to

    return app