import io
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

@pytest.fixture
def test_feedback_data():
    """
    Fixture to provide consistent test feedback data
    """
    return {
        'question': 'Tell me about a challenging project you worked on',
        'answer': 'I worked on a complex software integration project that required...',
        'feedback': 'Your response demonstrates problem-solving skills and technical depth.'
    }

# ===============================
# Feedback Creation Tests
# ===============================

def test_feedback_create_unauthorized(client):
    """
    Attempt to create a feedback entry without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.post(
        '/feedback',
        json={'question': 'Test', 'answer': 'Test', 'feedback': 'Test'}
    )
    assert response.status_code == 401


def test_feedback_create_missing_fields(client, test_user):
    """
    Attempt to create a feedback entry with missing required fields.
    Expect a 400 or 500 error.
    """
    token = generate_jwt_token(test_user)
    
    # Test with missing question
    response = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json={'answer': 'Test answer', 'feedback': 'Test feedback'}
    )
    assert response.status_code >= 400

    # Test with missing answer
    response = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json={'question': 'Test question', 'feedback': 'Test feedback'}
    )
    assert response.status_code >= 400

    # Test with missing feedback
    response = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json={'question': 'Test question', 'answer': 'Test answer'}
    )
    assert response.status_code >= 400


def test_feedback_create_success(client, test_user, test_feedback_data):
    """
    Successfully create a feedback entry.
    Expect a 201 response with feedback details.
    """
    token = generate_jwt_token(test_user)
    response = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json=test_feedback_data
    )
    
    res_data = response.get_json()
    assert response.status_code == 201
    assert 'id' in res_data
    assert res_data['question'] == test_feedback_data['question']
    assert res_data['answer'] == test_feedback_data['answer']
    assert 'feedback' in res_data


# ===============================
# Feedback List Tests
# ===============================

def test_feedback_list_unauthorized(client):
    """
    Attempt to list feedbacks without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.get('/feedback')
    assert response.status_code == 401


def test_feedback_list_success(client, test_user, test_feedback_data):
    """
    Successfully list feedbacks for the current user.
    Create a feedback first, then verify that the list endpoint returns it.
    """
    token = generate_jwt_token(test_user)
    
    # Create a feedback first
    create_resp = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json=test_feedback_data
    )
    assert create_resp.status_code == 201
    created_feedback = create_resp.get_json()

    # Get the list of feedbacks
    list_resp = client.get(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'}
    )
    res_data = list_resp.get_json()
    assert list_resp.status_code == 200
    assert isinstance(res_data, list)
    
    # Verify that the created feedback is present in the list
    assert any(
        fb['question'] == test_feedback_data['question'] and 
        fb['answer'] == test_feedback_data['answer'] 
        for fb in res_data
    )


# ===============================
# Feedback Get Single Entry Tests
# ===============================

def test_feedback_get_single_unauthorized(client):
    """
    Attempt to get a single feedback entry without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.get('/feedback/some_feedback_id')
    assert response.status_code == 401


def test_feedback_get_single_not_found(client, test_user):
    """
    Attempt to get a non-existent feedback entry.
    Expect a 404 with an error message.
    """
    token = generate_jwt_token(test_user)
    get_resp = client.get(
        '/feedback/nonexistent_feedback_id',
        headers={'Authorization': f'Bearer {token}'}
    )
    get_data = get_resp.get_json()
    assert get_resp.status_code == 404
    assert 'error' in get_data


def test_feedback_get_single_success(client, test_user, test_feedback_data):
    """
    Create a feedback entry and then retrieve it successfully.
    Expect a 200 response with the correct feedback details.
    """
    token = generate_jwt_token(test_user)
    
    # Create a feedback first
    create_resp = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json=test_feedback_data
    )
    assert create_resp.status_code == 201
    created_feedback = create_resp.get_json()

    # Retrieve the created feedback
    get_resp = client.get(
        f'/feedback/{created_feedback["id"]}',
        headers={'Authorization': f'Bearer {token}'}
    )
    get_data = get_resp.get_json()
    
    assert get_resp.status_code == 200
    assert get_data['question'] == test_feedback_data['question']
    assert get_data['answer'] == test_feedback_data['answer']


# ===============================
# Feedback Update Tests
# ===============================

def test_feedback_update_unauthorized(client):
    """
    Attempt to update a feedback entry without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.put(
        '/feedback/some_feedback_id', 
        json={'question': 'Updated question'}
    )
    assert response.status_code == 401


def test_feedback_update_not_found(client, test_user):
    """
    Attempt to update a non-existent feedback entry.
    Expect a 404 with an error message.
    """
    token = generate_jwt_token(test_user)
    update_resp = client.put(
        '/feedback/nonexistent_feedback_id',
        headers={'Authorization': f'Bearer {token}'},
        json={'question': 'Updated question'}
    )
    update_data = update_resp.get_json()
    assert update_resp.status_code == 404
    assert 'error' in update_data


def test_feedback_update_success(client, test_user, test_feedback_data):
    """
    Create a feedback entry and then update it successfully.
    Expect a 200 response with the updated details.
    """
    token = generate_jwt_token(test_user)
    
    # Create a feedback first
    create_resp = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json=test_feedback_data
    )
    assert create_resp.status_code == 201
    created_feedback = create_resp.get_json()

    # Update the created feedback
    update_data = {
        'question': 'Updated interview question',
        'answer': 'Updated comprehensive answer',
        'feedback': 'Updated detailed feedback'
    }
    update_resp = client.put(
        f'/feedback/{created_feedback["id"]}',
        headers={'Authorization': f'Bearer {token}'},
        json=update_data
    )
    update_result = update_resp.get_json()
    
    assert update_resp.status_code == 200
    assert 'message' in update_result
    assert update_result['message'] == 'Feedback updated successfully'


# ===============================
# Feedback Delete Tests
# ===============================

def test_feedback_delete_unauthorized(client):
    """
    Attempt to delete a feedback entry without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.delete('/feedback/some_feedback_id')
    assert response.status_code == 401


def test_feedback_delete_not_found(client, test_user):
    """
    Attempt to delete a non-existent feedback entry.
    Expect a 404 with an error message.
    """
    token = generate_jwt_token(test_user)
    delete_resp = client.delete(
        '/feedback/nonexistent_feedback_id',
        headers={'Authorization': f'Bearer {token}'}
    )
    del_data = delete_resp.get_json()
    assert delete_resp.status_code == 404
    assert 'error' in del_data
    assert del_data['error'] == 'Feedback not found'


def test_feedback_delete_success(client, test_user, test_feedback_data):
    """
    Create a feedback entry then delete it successfully.
    Expect a 200 response with a success message.
    """
    token = generate_jwt_token(test_user)
    
    # Create a feedback first
    create_resp = client.post(
        '/feedback',
        headers={'Authorization': f'Bearer {token}'},
        json=test_feedback_data
    )
    assert create_resp.status_code == 201
    created_feedback = create_resp.get_json()

    # Delete the created feedback
    del_resp = client.delete(
        f'/feedback/{created_feedback["id"]}',
        headers={'Authorization': f'Bearer {token}'}
    )
    del_data = del_resp.get_json()
    
    assert del_resp.status_code == 200
    assert 'message' in del_data
    assert del_data['message'] == 'Feedback deleted successfully'