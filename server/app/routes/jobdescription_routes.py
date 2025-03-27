from flask import request, jsonify, make_response
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.JobDescriptionService import JobDescriptionService

# Namespace
job_description_ns = Namespace('job_descriptions', description='Job description operations')

create_job_description_model = job_description_ns.model(
    "CreateJobDescription", {
        "title": fields.String(required=True, description="Job title"),
        "description": fields.String(required=True, description="Job description"),
        "companyName": fields.String(required=True, description="Company Name"),
        "companyIndustry": fields.String(required=True, description="Company Industry"),
        "companyInfo": fields.String(required=True, description="Company Info"),
        "skills": fields.List(fields.String, required=True, description="List of skills"),
        "experience_level": fields.String(required=True, description="Experience level")
    }
)

update_job_description_model = job_description_ns.model(
    "UpdateJobDescription", {
        "title": fields.String(required=True, description="Job title"),
        "description": fields.String(required=True, description="Job description"),
        "companyName": fields.String(required=True, description="Company Name"),
        "companyIndustry": fields.String(required=True, description="Company Industry"),
        "companyInfo": fields.String(required=True, description="Company Info"),
        "skills": fields.List(fields.String, required=True, description="List of skills"),
        "experience_level": fields.String(required=True, description="Experience level")
    }
)

job_description_response_model = job_description_ns.model(
    "JobDescriptionResponse", {
        "id": fields.String(description="Job description ID"),
        "title": fields.String(description="Job title"),
        "description": fields.String(description="Job description"),
        "userid": fields.String(description="User ID"),
        "companyName": fields.String(description="Company Name"),
        "companyIndustry": fields.String(description="Company Industry"),
        "companyInfo": fields.String(description="Company Info"),
        "skills": fields.List(fields.String, description="List of skills"),
        "experience_level": fields.String(description="Experience level"),
        "created_at": fields.DateTime(description="Creation timestamp"),
        "updated_at": fields.DateTime(description="Last update timestamp")
    }
)

# Routes
@job_description_ns.route('/')
class JobDescriptionListResource(Resource):
    @job_description_ns.response(200, "Success", [job_description_response_model])
    @job_description_ns.response(500, "Internal Server Error")
    @jwt_required()
    def get(self):
        """Get all job descriptions for the current user"""
        user_id = get_jwt_identity()  
        print("Request headers:", request.headers)

        try:
            job_descriptions = JobDescriptionService.get_all_job_descriptions(user_id)
            return make_response(jsonify([job.to_dict() for job in job_descriptions]), 200)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.expect(create_job_description_model)
    @job_description_ns.response(201, "Job description created", job_description_response_model)
    @job_description_ns.response(400, "Bad Request")
    @job_description_ns.response(500, "Internal Server Error")
    @jwt_required()
    def post(self):
        """Create a new job description"""
        data = request.json
        user_id = get_jwt_identity()  

        if not data or "title" not in data or "description" not in data:
            return make_response(jsonify({"error": "Missing required fields"}), 400)

        try:
            job_description = JobDescriptionService.create_job_description(
                title=data["title"],
                description=data["description"],
                userid=user_id,
                companyName=data["companyName"],
                companyIndustry=data["companyIndustry"],
                companyInfo=data["companyInfo"],
                skills=data["skills"],
                experience_level=data["experience_level"]
            )
            return make_response(jsonify(job_description.to_dict()), 201)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

@job_description_ns.route('/<string:id>')
class JobDescriptionResource(Resource):
    @job_description_ns.response(200, "Success", job_description_response_model)
    @job_description_ns.response(404, "Job description not found")
    @job_description_ns.response(500, "Internal Server Error")
    @jwt_required()
    def get(self, id):
        """Get a job description by ID"""
        user_id = get_jwt_identity() 
        try:
            job_description = JobDescriptionService.get_job_description_by_id(user_id, id)
            if job_description:
                return make_response(jsonify(job_description.to_dict()), 200)
            return make_response(jsonify({"error": "Job description not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.expect(update_job_description_model)
    @job_description_ns.response(200, "Job description updated", job_description_response_model)
    @job_description_ns.response(404, "Job description not found")
    @job_description_ns.response(500, "Internal Server Error")
    @jwt_required()
    def put(self, id):
        """Update an existing job description"""
        data = request.json
        user_id = get_jwt_identity() 

        try:
            job_description = JobDescriptionService.update_job_description(
                id=id,
                userid = user_id,
                title=data["title"],
                description=data["description"],
                companyName=data["companyName"],
                companyIndustry=data["companyIndustry"],
                companyInfo=data["companyInfo"],
                skills=data["skills"],
                experience_level=data["experience_level"]
            )
            
            if job_description:
                return make_response(jsonify(job_description.to_dict()), 200)
            
            return make_response(jsonify({"error": "Job description not found"}), 404)
        
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.response(200, "Job description deleted")
    @job_description_ns.response(404, "Job description not found")
    @job_description_ns.response(500, "Internal Server Error")
    @jwt_required()
    def delete(self, id):
        """Delete a job description by ID"""
        user_id = get_jwt_identity() 
        try:
            deleted = JobDescriptionService.delete_job_description(user_id, id)
            
            if deleted:
                return make_response(jsonify({"message": "Job description deleted"}), 200)
            
            return make_response(jsonify({"error": "Job description not found"}), 404)
        
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)