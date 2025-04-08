import uuid
from ..exts import db
from datetime import datetime
from sqlalchemy.dialects.mysql import LONGBLOB

class UserResponse(db.Model):
    __tablename__ = "user_responses"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    audio_blob = db.Column(LONGBLOB, nullable=True)
    
    response_score = db.Column(db.Float, nullable=True)
    response_time = db.Column(db.Integer, nullable=True)

    user_id = db.Column(db.String(36), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True)

    feedback = db.relationship("Feedback", back_populates="response", cascade="all, delete")

    question_id = db.Column(db.String(36), db.ForeignKey("interview_questions.id"), nullable=False)
    question = db.relationship("InterviewQuestion", back_populates="user_response")