import pytest
from app.utils.jwt_handler import generate_jwt_token
from app.models.user import User
from app.exts import db

@pytest.fixture
def test_user(app):
    user = User(email="test@example.com", firstName="Test", lastName="User", password="password123")
    with app.app_context():
        db.session.add(user)
        db.session.commit()
        user = db.session.query(User).filter_by(email="test@example.com").first()
    return user

# ===============================
# Feedback Creation Tests
# ===============================

def test_feedback_create_unauthorized(client):
    """
    Attempt to create feedback without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.post('/feedback', json={
        "question": "What is OOP?",
        "answer": "Object-oriented programming."
    })
    assert response.status_code == 401

def test_feedback_create_success(client, test_user):
    """
    Successfully create a feedback entry.
    Expect 201 response with feedback details.
    """
    token = generate_jwt_token(test_user)
    response = client.post('/feedback',
                           headers={'Authorization': f'Bearer {token}'},
                           json={
                               "question": "What is OOP?",
                               "answer": "Object-oriented programming.",
                               "feedback": "Good explanation!"
                           })
    data = response.get_json()
    print("Response JSON:", data)  # Debugging output


    assert response.status_code == 201
    assert "id" in data
    assert data["question"] == "What is OOP?"
    assert data["answer"] == "Object-oriented programming."
    assert data["feedback"] == "Good explanation!"

# ===============================
# Feedback Retrieval Tests
# ===============================

def test_feedback_list_unauthorized(client):
    """
    Attempt to list feedback entries without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.get('/feedback')
    assert response.status_code == 401

def test_feedback_list_success(client, test_user):
    """
    Successfully retrieve feedback entries.
    Expect 200 response with a list of feedback entries.
    """
    token = generate_jwt_token(test_user)
    response = client.get('/feedback', headers={'Authorization': f'Bearer {token}'})
    assert response.status_code == 200
    assert isinstance(response.get_json(), list)

# ===============================
# Feedback Update Tests
# ===============================

def test_feedback_update_success(client, test_user):
    """
    Successfully update an existing feedback entry.
    Expect 200 response with success message.
    """
    token = generate_jwt_token(test_user)
    create_resp = client.post('/feedback',
                              headers={'Authorization': f'Bearer {token}'},
                              json={
                                  "question": "What is OOP?",
                                  "answer": "Object-oriented programming.",
                                  "feedback": "Good explanation!"
                              })
    feedback_id = create_resp.get_json()["id"]

    update_resp = client.put(f'/feedback/{feedback_id}',
                             headers={'Authorization': f'Bearer {token}'},
                             json={"feedback": "Needs more details."})
    data = update_resp.get_json()
    assert update_resp.status_code == 200
    assert data['message'] == 'Feedback updated successfully'

# ===============================
# Feedback Deletion Tests
# ===============================

def test_feedback_delete_success(client, test_user):
    """
    Successfully delete a feedback entry.
    Expect 200 response with success message.
    """
    token = generate_jwt_token(test_user)
    create_resp = client.post('/feedback',
                              headers={'Authorization': f'Bearer {token}'},
                              json={
                                  "question": "What is OOP?",
                                  "answer": "Object-oriented programming.",
                                  "feedback": "Good explanation!"
                              })
    feedback_id = create_resp.get_json()["id"]

    delete_resp = client.delete(f'/feedback/{feedback_id}',
                                headers={'Authorization': f'Bearer {token}'})
    data = delete_resp.get_json()
    assert delete_resp.status_code == 200
    assert data['message'] == 'Feedback deleted successfully'

def test_feedback_delete_not_found(client, test_user):
    """
    Attempt to delete a non-existent feedback entry.
    Expect 404 Not Found.
    """
    token = generate_jwt_token(test_user)
    response = client.delete('/feedback/nonexistent_id',
                             headers={'Authorization': f'Bearer {token}'})
    data = response.get_json()
    assert response.status_code == 404
    assert data['error'] == 'Feedback not found'
