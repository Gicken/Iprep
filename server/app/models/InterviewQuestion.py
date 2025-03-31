import uuid
from datetime import datetime
from ..exts import db

class InterviewQuestion(db.Model):
    __tablename__ = "interview_questions"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    question_text = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)


