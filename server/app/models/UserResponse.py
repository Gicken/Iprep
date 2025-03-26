import uuid
from ..exts import db
from datetime import datetime

class UserResponse(db.Model):
    __tablename__ = "user_responses"

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = db.Column(db.String(255), nullable=False)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.TIMESTAMP, default=datetime.utcnow, nullable=False)
    
    response_score = db.Column(db.Float, nullable=True)
    response_time = db.Column(db.Integer, nullable=True)
    
    user_id = db.Column(db.String(36), db.ForeignKey("user.id"), nullable=False)
    
    user = db.relationship("User", back_populates="responses")

    # def __init__(self, filename, text):
    #     self.filename = filename
    #     self.text = text
        
    def __repr__(self):
        return f"<Transcription {self.id}: {self.filename}>"