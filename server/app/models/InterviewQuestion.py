# import uuid
# from datetime import datetime
# from ..exts import db

# class InterviewQuestion(db.Model):
#     __tablename__ = "interview_questions"

#     id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
#     question_text = db.Column(db.Text, nullable=False)
#     category = db.Column(db.String(255), nullable=False)
#     expected_answer = db.Column(db.Text, nullable=True)
#     difficulty_level = db.Column(db.String(50), nullable=False)
#     is_follow_up = db.Column(db.Boolean, default=False)
#     created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)

#     user_responses = db.relationship("UserResponse", back_populates="interview_questions", cascade="all, delete")

#     def __repr__(self):
#         return f"<Question {self.id}: {self.question_text[:50]}>"
