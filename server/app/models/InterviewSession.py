import uuid
from datetime import datetime
from ..exts import db

class InterviewSession(db.Model):
    __tablename__ = "interview_session"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    job_id = db.Column(db.String(36), db.ForeignKey('job_description.id'), nullable=False)
    cv_id = db.Column(db.String(36), db.ForeignKey('cv.id'), nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)


    # questions = db.relationship('InterviewQuestion', secondary='interview_session_questions', backref='sessions')
    questions = db.relationship('InterviewQuestion', back_populates="session", cascade="all, delete")

    # user_responses = db.relationship("UserResponse", back_populates="session", cascade="all, delete")
