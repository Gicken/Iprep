from ..exts import db
import uuid
from sqlalchemy.dialects.mysql import CHAR

class JobDescription(db.Model):
    __tablename__ = 'job_description'
    
    id = db.Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    def __repr__(self):
        return f'<JobDescription {self.title}>'
    
    def to_dict(self):
            return {
        "id": self.id,
        "title": self.title,
        "description": self.description,
        "created_at": self.created_at.isoformat() if self.created_at else None,
        "updated_at": self.updated_at.isoformat() if self.updated_at else None
    }