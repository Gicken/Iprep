import uuid
from datetime import datetime
from ..exts import db

class InterviewSession(db.Model):
    __tablename__ = "interview_session"
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True)
    job_id = db.Column(db.String(36), db.ForeignKey('job_description.id'), nullable=False)
    cv_id = db.Column(db.String(36), db.ForeignKey('cv.id'), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    length = db.Column(db.Integer,nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
    questions = db.relationship('InterviewQuestion', back_populates="session", cascade="all, delete")
    cv = db.relationship('CV', back_populates='sessions')
    job_description = db.relationship('JobDescription', back_populates='sessions')
