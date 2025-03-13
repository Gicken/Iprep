from ..exts import db
from sqlalchemy import Column, CHAR
import uuid
from datetime import datetime

class CV(db.Model):
    __tablename__ = 'cv'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    file_name = db.Column(db.String(255), nullable=False)
    file_data = db.Column(db.LargeBinary(length=(2**32)-1), nullable=False) #Store the file here
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String(36), db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('cvs', lazy=True))
