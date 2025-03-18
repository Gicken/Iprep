from flask import Blueprint
from flask_restx import Api
from .routes import job_description_ns  

#Blueprint for job descriptions
job_description_bp = Blueprint("job_description", __name__, url_prefix="/api/job_descriptions")

#API instance and namespace
api = Api(job_description_bp, title="Job Description API", description="Operations related to job descriptions")
api.add_namespace(job_description_ns)  

# Function to initialize the job description module
def init_job_description(app):
    app.register_blueprint(job_description_bp)  