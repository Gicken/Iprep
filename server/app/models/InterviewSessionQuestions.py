from ..exts import db
import uuid

class InterviewSessionQuestions(db.Model):
    __tablename__ = "interview_session_questions"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = db.Column(db.String(36), db.ForeignKey('interview_session.id'), nullable=False)
    question_id = db.Column(db.String(36), db.ForeignKey('interview_questions.id'), nullable=False)