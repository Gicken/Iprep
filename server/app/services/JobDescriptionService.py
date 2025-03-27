from ..models.JobDescription import JobDescription
from app.exts import db

class JobDescriptionService:
    @staticmethod
    def get_all_job_descriptions(userid):
        """Get all job descriptions for the current user."""
        return JobDescription.query.filter_by(userid=userid).all()

    @staticmethod
    def get_job_description_by_company_industry(userid, company_industry):
        """Get job descriptions for the current user by company industry."""
        return JobDescription.query.filter_by(userid=userid, companyIndustry=company_industry).all()

    @staticmethod
    def get_job_description_by_company_name(userid, company_name):
        """Get job descriptions for the current user by company name."""
        return JobDescription.query.filter_by(userid=userid, companyName=company_name).all()
    
    @staticmethod
    def get_job_description_by_id(userid, job_description_id):
        """Retrieve a job description for the current user by its ID."""
        return JobDescription.query.filter_by(userid=userid, id=job_description_id).first()

    @staticmethod
    def create_job_description(title, description, companyIndustry, userid, companyName, companyInfo, skills, experience_level):
        """Create a new job description."""
        job_description = JobDescription(
            title=title,
            description=description,
            userid=userid,
            companyName=companyName,  
            companyIndustry=companyIndustry,
            companyInfo=companyInfo,  
            skills=skills,  
            experience_level=experience_level  # passed the experience_level correctly
        )
        db.session.add(job_description)
        db.session.commit()
        return job_description

    @staticmethod
    def update_job_description(userid, id, title, description, companyIndustry, companyName, companyInfo, skills, experience_level):
        """Update an existing job description for the current user."""
        job_description = JobDescription.query.filter_by(userid=userid, id=id).first()
        if job_description:
            job_description.title = title
            job_description.description = description
            job_description.companyIndustry = companyIndustry
            job_description.companyName = companyName  
            job_description.companyInfo = companyInfo  
            job_description.skills = skills  
            job_description.experience_level = experience_level  # updated to match model
            db.session.commit()
            return job_description
        return None

    @staticmethod
    def delete_job_description(userid, id):
        """Delete a job description for the current user."""
        job_description = JobDescription.query.filter_by(userid=userid, id=id).first()
        if job_description:
            db.session.delete(job_description)
            db.session.commit()
            return job_description
        return None