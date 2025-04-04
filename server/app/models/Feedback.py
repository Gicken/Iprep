from ..exts import db
import uuid
from datetime import datetime

class Feedback(db.Model):
    __tablename__ = 'feedback'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True)
    response_id = db.Column(db.String(36), db.ForeignKey("user_responses.id"), nullable=False)
    response = db.relationship("UserResponse", back_populates="feedback")
    feedbackStrength = db.Column(db.Text, nullable=False)
    feedbackImprove = db.Column(db.Text, nullable=False)    
    feedbackRecommendation = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

