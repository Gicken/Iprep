from ..models.JobDescription import JobDescription
from app.exts import db

class JobDescriptionService:
    @staticmethod
    def get_job_descriptions():
        """Get all job descriptions"""
        return JobDescription.query.all()

    @staticmethod
    def get_job_description_by_id(id):
        """Get a job description by its ID"""
        return JobDescription.query.get(id)

    @staticmethod
    def create_job_description(title, description):
        """Create a new job description"""
        job_description = JobDescription(title=title, description=description)
        db.session.add(job_description)
        db.session.commit()
        return job_description

    @staticmethod
    def update_job_description(id, title, description):
        """Update an existing job description"""
        job_description = JobDescription.query.get(id)
        if job_description:
            job_description.title = title
            job_description.description = description
            db.session.commit()
            return job_description
        return None

    @staticmethod
    def delete_job_description(id):
        """Delete a job description"""
        job_description = JobDescription.query.get(id)
        if job_description:
            db.session.delete(job_description)
            db.session.commit()
            return job_description
        return None