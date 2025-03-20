import pytest
from app import create_app
from app.exts import db
from app.models.user import User
import json

@pytest.fixture(scope="module")
def app():
    """Create a new app instance for the test session"""
    app = create_app("testing") 
    with app.app_context():
        db.create_all()  
        yield app
        db.drop_all()  
    db.session.remove()

@pytest.fixture
def client(app):
    """Returns a test client that can send HTTP requests"""
    return app.test_client()

def test_successful_registration(client):
    """Test successful user registration"""
    response = client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@fdmgroup.com",
        "password": "Password@123",
        "confirmPassword": "Password@123"
    })

    data = response.get_json()
    assert response.status_code == 201
    assert "message" in data
    assert data["message"] == "User registered successfully!"
    assert "user_id" in data
    assert "email" in data
    assert data["email"] == "john.doe@fdmgroup.com"

def test_missing_fields(client):
    """Test user registration with missing fields"""
    response = client.post("/register/", json={})
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "First name and last name are required."

    response = client.post("/register/", json={"firstName": "John"})
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "First name and last name are required."

def test_invalid_email(client):
    """Test user registration with invalid email"""
    response = client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "invalid.email@gmail.com",
        "password": "Password@123",
        "confirmPassword": "Password@123"
    })
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Please use a valid FDM email address."

def test_password_mismatch(client):
    """Test user registration with mismatched passwords"""
    response = client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@fdmgroup.com",
        "password": "Password@123",
        "confirmPassword": "DifferentPassword@123"
    })
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Passwords do not match."

def test_weak_password(client):
    """Test user registration with a weak password"""
    response = client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@fdmgroup.com",
        "password": "weak",
        "confirmPassword": "weak"
    })
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Password must be at least 8 characters long and include one special character."

    response = client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@fdmgroup.com",
        "password": "StrongButNoSpecial",
        "confirmPassword": "StrongButNoSpecial"
    })
    data = response.get_json()
    assert response.status_code == 400
    assert "error" in data
    assert data["error"] == "Password must be at least 8 characters long and include one special character."

def test_duplicate_email(client):
    """Test user registration with duplicate email"""
    # Register a user first
    client.post("/register/", json={
        "firstName": "John",
        "lastName": "Doe",
        "email": "duplicate@fdmgroup.com",
        "password": "Password@123",
        "confirmPassword": "Password@123"
    })
    # Try registering again with the same email
    response = client.post("/register/", json={
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "duplicate@fdmgroup.com",
        "password": "AnotherPassword@123",
        "confirmPassword": "AnotherPassword@123"
    })
    data = response.get_json()
    assert response.status_code == 409
    assert data["error"] == "Email address already in use."
