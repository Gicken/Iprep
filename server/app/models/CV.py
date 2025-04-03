from ..exts import db
import uuid
from datetime import datetime
from sqlalchemy.dialects.mysql import MEDIUMBLOB

class CV(db.Model):
    __tablename__ = 'cv'

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    file_name = db.Column(db.String(255), nullable=False)
    file_data = db.Column(MEDIUMBLOB, nullable=False)
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.String(36), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False, index=True)


    user = db.relationship("User", backref=db.backref("cvs", lazy=True, cascade="all,delete-orphan"))
    user = db.relationship("User", backref=db.backref("feedbacks", lazy=True, cascade="all, delete-orphan"))

