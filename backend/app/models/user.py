# backend/app/models/user.py
from app import db
import uuid
from datetime import datetime, timezone

class User(db.Model):
    """User model with MySQL column names firstName, lastName, password, createdAt, and modifiedAt."""
    
    __tablename__ = 'users'  # Ensure this matches the table name in your MySQL database

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # This is the hashed password
    createdAt = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))  # Timezone-aware UTC datetime
    updatedAt = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))  # Timezone-aware UTC datetime for update

    def __repr__(self):
        return f"<User {self.firstName} {self.lastName}>"
