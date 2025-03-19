from flask import request, jsonify, make_response
from flask_restx import Namespace, Resource, fields
from .services import JobDescriptionService


job_description_ns = Namespace('job_descriptions', description='Job description operations')

create_job_description_model = job_description_ns.model(
    "CreateJobDescription", {
        "title": fields.String(required=True, description="Job title"),
        "description": fields.String(required=True, description="Job description")
    }
)

update_job_description_model = job_description_ns.model(
    "UpdateJobDescription", {
        "title": fields.String(required=True, description="Job title"),
        "description": fields.String(required=True, description="Job description")
    }
)

job_description_response_model = job_description_ns.model(
    "JobDescriptionResponse", {
        "id": fields.String(description="Job description ID"),
        "title": fields.String(description="Job title"),
        "description": fields.String(description="Job description"),
        "created_at": fields.DateTime(description="Creation timestamp"),
        "updated_at": fields.DateTime(description="Last update timestamp")
    }
)

@job_description_ns.route('/')
class JobDescriptionListResource(Resource):
    @job_description_ns.response(200, "Success", [job_description_response_model])
    @job_description_ns.response(500, "Internal Server Error")
    def get(self):
        """Get all job descriptions"""
        try:
            job_descriptions = JobDescriptionService.get_job_descriptions()
            return jsonify([job_description.to_dict() for job_description in job_descriptions])
        except Exception as e:
            # Log error for debugging purposes
            print(f"Error: {str(e)}")
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.expect(create_job_description_model)
    @job_description_ns.response(201, "Job description created", job_description_response_model)
    @job_description_ns.response(400, "Bad Request")
    @job_description_ns.response(500, "Internal Server Error")
    def post(self):
        """Create a new job description"""
        data = request.json
        if not data or "title" not in data or "description" not in data:
            return make_response(jsonify({"error": "Missing title or description"}), 400)

        try:
            job_description = JobDescriptionService.create_job_description(data["title"], data["description"])
            print("Created Successfully")
            return make_response(jsonify(job_description.to_dict()), 201)
        except Exception as e:
            print(f"Error: {str(e)}")  # Log error for debugging
            return make_response(jsonify({"error": str(e)}), 500)

@job_description_ns.route('/<string:id>')
class JobDescriptionResource(Resource):
    @job_description_ns.response(200, "Success", job_description_response_model)
    @job_description_ns.response(404, "Job description not found")
    def get(self, id):
        """Get a job description by ID"""
        try:
            job_description = JobDescriptionService.get_job_description_by_id(id)
            if job_description:
                return make_response(jsonify(job_description.to_dict()), 201)
            return make_response(jsonify({"error": "Job description not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.expect(update_job_description_model)
    @job_description_ns.response(200, "Job description updated", job_description_response_model)
    @job_description_ns.response(404, "Job description not found")
    def put(self, id):
        """Update an existing job description"""
        data = request.json
        try:
            job_description = JobDescriptionService.update_job_description(id, data["title"], data["description"])
            if job_description:
                return make_response(jsonify(job_description.to_dict()), 201)
            return make_response(jsonify({"error": "Job description not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)

    @job_description_ns.response(200, "Job description deleted")
    @job_description_ns.response(404, "Job description not found")
    def delete(self, id):
        """Delete a job description by ID"""
        try:
            job_description = JobDescriptionService.delete_job_description(id)
            if job_description:
                return make_response(jsonify({"message": "Job description deleted"}), 200)
            return make_response(jsonify({"error": "Job description not found"}), 404)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 500)