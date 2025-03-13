# ---------------------------------------------------------
#           ROUTES TEST FILE BELOW
# ---------------------------------------------------------
# Using this file to write tests for my routes file
# ---------------------------------------------------------

import pytest
from app.models.user import User
from app.exts import db
from app.utils.jwt_handler import generate_jwt_token

def test_home_route(client):
    """Test if the home route returns a 200 response"""
    response = client.get("/")
    assert response.status_code == 200
    
@pytest.fixture
def test_user(app):
    user = User(firstName="Test", lastName="User", email="test@example.com", password="password123")
    user.role="user"
    with app.app_context():
        db.session.add(user)
        db.session.commit()
        db.session.refresh(user)
    return user

@pytest.fixture
def admin_user(app):
    user = User(firstName="Admin", lastName="User", email="admin@example.com",password="password123")
    user.role = "Admin"
    with app.app_context():
        db.session.add(user)
        db.session.commit()
        db.session.refresh(user)
    return user

def test_get_all_users_unauthorized(client):
    response = client.get('/users/')
    assert response.status_code == 401

def test_get_all_users_authorized(client, admin_user):
    token=generate_jwt_token(admin_user)
    response = client.get('/users/', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert 'email' in data[0]

def test_get_current_user_unauthorized(client):
    response = client.get('/users/me')
    assert response.status_code == 401

def test_get_current_user_not_found(client):
    token = "invalid_token"  # Use an invalid token
    response = client.get('/users/me', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 422
