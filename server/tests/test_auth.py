import pytest
from app.models.user import User
from app.exts import db

@pytest.fixture
def test_user(app):
    user = User(email="test@example.com", firstName="Test", lastName="User", password="password123")
    with app.app_context():
        db.session.add(user)
        db.session.commit()
    return user

def test_login_success(client, test_user):
    response = client.post(
        '/auth/login',
        json={"email": "test@example.com", "password": "password123"}
    )
    data = response.get_json()
    assert response.status_code == 200
    assert "access_token" in data
    assert data["message"] == "Logged in successfully"

def test_login_missing_data(client):
    response = client.post('/auth/login', json={})
    data = response.get_json()
    assert response.status_code == 400
    assert "Error" in data
    assert data["Error"] == "Missing email or password"

def test_login_invalid_email(client):
    response = client.post(
        '/auth/login',
        json={"email": "nonexistent@example.com", "password": "password123"}
    )
    data = response.get_json()
    assert response.status_code == 404
    assert "Error" in data
    assert data["Error"] == "User with this email does not exist"

def test_login_invalid_password(client, test_user):
    response = client.post(
        '/auth/login',
        json={"email": "test@example.com", "password": "wrongpassword"}
    )
    data = response.get_json()
    assert response.status_code == 401
    assert "Error" in data
    assert data["Error"] == "Invalid email or password"


def test_login_user(client):
    """Test user login endpoint"""
    login_data = {"email": "test@example.com", "password": "password123"}
    response = client.post("/auth/login", json=login_data)
    assert response.status_code == 200
    assert "access_token" in response.json
