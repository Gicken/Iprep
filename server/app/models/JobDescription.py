from ..exts import db
import uuid
from sqlalchemy.dialects.mysql import CHAR, VARCHAR, TEXT, JSON, DATETIME

class JobDescription(db.Model):
    __tablename__ = 'job_description'
    
    id = db.Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    title = db.Column(VARCHAR(255), nullable=False)
    description = db.Column(TEXT, nullable=False)
    companyName = db.Column(VARCHAR(36), nullable=False)  
    companyIndustry = db.Column(VARCHAR(255), nullable=False)
    companyInfo = db.Column(TEXT, nullable=False)
    skills = db.Column(JSON, nullable=False)
    experience_level = db.Column(VARCHAR(100), nullable=False)
    created_at = db.Column(DATETIME, default=db.func.current_timestamp())
    updated_at = db.Column(DATETIME, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    userid = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('jobs', lazy=True))
    sessions = db.relationship('InterviewSession', back_populates='job_description', cascade="all, delete-orphan")


    def __repr__(self):
        return f'<JobDescription {self.userid} - {self.title}>'

    def to_dict(self):
        """Convert the model to a dictionary representation."""
        return {
            "id": self.id,
            "userid": self.userid,
            "title": self.title,
            "companyName": self.companyName,  
            "company_industry": self.companyIndustry,
            "company_info": self.companyInfo,
            "description": self.description,
            "skills": self.skills,
            "experience_level": self.experience_level,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
