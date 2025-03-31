from ..exts import db
import uuid

class InterviewSessionQuestions(db.Model):
    __tablename__ = "interview_session_questions"

    session_id = db.Column(db.String(36), db.ForeignKey('interview_session.id'), nullable=False)
    question_id = db.Column(db.String(36), db.ForeignKey('interview_questions.id'), nullable=False)

    __table_args__ = (
        db.PrimaryKeyConstraint(session_id, question_id),
    )