from werkzeug.security import generate_password_hash, check_password_hash
from ..exts import db
import uuid
from sqlalchemy.dialects.mysql import CHAR
from sqlalchemy import Column

class User(db.Model):
    __tablename__ = 'user'
    
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    firstName = db.Column(db.String(255))
    lastName = db.Column(db.String(255))
    email = db.Column(db.String(255), unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='user')
    createdAt = db.Column(db.DateTime, default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    @property
    def password(self):
        """To prevent reading the password directly"""
        raise AttributeError("Password is write-only")

    @password.setter
    def password(self, password):
        """Hash the password before setting it"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Check the hashed password"""
        return check_password_hash(self.password_hash, password)

    def __init__(self, firstName, lastName, email, password,role='user'):
        self.firstName = firstName
        self.lastName = lastName
        self.email = email
        self.password = password
        self.role

    def __repr__(self):
        return f'<User {self.firstName} {self.lastName}>'