from app.exts import db
from sqlalchemy import Column, CHAR
import uuid
from datetime import datetime

class CV(db.Model):
    __tablename__ = 'cv'
    
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    file_path = db.Column(db.String(256), nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Foreign key to link CV to a user
    user_id = Column(CHAR(36), db.ForeignKey('user.id'), nullable=False)
    
    # Relationship to the User model
    user = db.relationship('User', backref=db.backref('cvs', lazy=True))

    def __repr__(self):
        return f'<CV {self.file_path} of user {self.user_id}>'