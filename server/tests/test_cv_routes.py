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


# ===============================
# CV Upload Tests
# ===============================

def test_cv_upload_unauthorized(client):
    """
    Attempt to upload a CV without an auth token.
    Expect 401 Unauthorized.
    """
    data = {
        'file': (io.BytesIO(b'dummy content'), 'test_cv.docx')
    }
    response = client.post(
        '/cv/upload',
        content_type='multipart/form-data',
        data=data
    )
    assert response.status_code == 401


def test_cv_upload_no_file(client, test_user):
    """
    Attempt upload without including a file.
    Expect a 400 with 'No file provided' error.
    """
    token = generate_jwt_token(test_user)
    response = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        data={}  # No file in request.files
    )
    data = response.get_json()
    assert response.status_code == 400
    assert 'error' in data
    assert data['error'] == 'No file provided'


def test_cv_upload_empty_filename(client, test_user):
    """
    Attempt upload with an empty filename.
    Expect a 400 with 'No file selected' error.
    """
    token = generate_jwt_token(test_user)
    data = {
        'file': (io.BytesIO(b'dummy content'), '')  # empty filename
    }
    response = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    res_data = response.get_json()
    assert response.status_code == 400
    assert 'error' in res_data
    assert res_data['error'] == 'No file selected'


def test_cv_upload_invalid_file_type(client, test_user):
    """
    Attempt upload with an invalid file extension.
    Expect a 400 with 'Invalid file type' error.
    """
    token = generate_jwt_token(test_user)
    data = {
        'file': (io.BytesIO(b'dummy content'), 'invalid.exe')
    }
    response = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    res_data = response.get_json()
    assert response.status_code == 400
    assert 'error' in res_data
    assert res_data['error'] == 'Invalid file type'


def test_cv_upload_file_too_large(client, test_user):
    """
    Attempt upload with a file larger than allowed.
    The code checks if request.content_length > 5MB.
    Expect a 413 error with a file too large message.
    """
    token = generate_jwt_token(test_user)
    # Create a dummy file of size 6MB
    large_content = b'a' * (6 * 1024 * 1024)
    data = {
        'file': (io.BytesIO(large_content), 'test_cv.docx')
    }
    response = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    res_data = response.get_json()
    assert response.status_code == 413
    assert 'error' in res_data
    assert res_data['error'] == 'File too large. Maximum size is 10MB'


def test_cv_upload_success(client, test_user):
    """
    Successful CV upload.
    Expect a 201 response with a success message, CV id, and file name.
    """
    token = generate_jwt_token(test_user)
    file_content = b"Test CV content"
    data = {
        'file': (io.BytesIO(file_content), 'test_cv.docx')
    }
    response = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    res_data = response.get_json()
    assert response.status_code == 201
    assert 'message' in res_data and res_data['message'] == 'CV uploaded successfully'
    assert 'cv_id' in res_data
    assert 'file_name' in res_data and res_data['file_name'] == 'test_cv.docx'


# ===============================
# CV List Tests
# ===============================

def test_cv_list_unauthorized(client):
    """
    Attempt to list CVs without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.get('/cv')
    assert response.status_code == 401


def test_cv_list_success(client, test_user):
    """
    Successfully list CVs for the current user.
    Upload a CV first, then verify that the list endpoint returns it.
    """
    token = generate_jwt_token(test_user)
    # Upload a CV
    file_content = b"Test CV content"
    data = {
        'file': (io.BytesIO(file_content), 'test_cv.docx')
    }
    upload_resp = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    assert upload_resp.status_code == 201

    # Get the list of CVs
    list_resp = client.get(
        '/cv',
        headers={'Authorization': f'Bearer {token}'}
    )
    res_data = list_resp.get_json()
    assert list_resp.status_code == 200
    assert isinstance(res_data, list)
    # Verify that the uploaded CV is present in the list
    assert any(cv['file_name'] == 'test_cv.docx' for cv in res_data)


# ===============================
# CV Delete Tests
# ===============================

def test_cv_delete_unauthorized(client):
    """
    Attempt to delete a CV without an auth token.
    Expect 401 Unauthorized.
    """
    response = client.delete('/cv/some_cv_id')
    assert response.status_code == 401


def test_cv_delete_success(client, test_user):
    """
    Upload a CV then delete it successfully.
    Expect a 200 response with a success message.
    """
    token = generate_jwt_token(test_user)
    # Upload a CV
    file_content = b"Test CV content"
    data = {
        'file': (io.BytesIO(file_content), 'test_cv.docx')
    }
    upload_resp = client.post(
        '/cv/upload',
        headers={'Authorization': f'Bearer {token}'},
        content_type='multipart/form-data',
        data=data
    )
    upload_data = upload_resp.get_json()
    cv_id = upload_data['cv_id']

    # Delete the uploaded CV
    del_resp = client.delete(
        f'/cv/{cv_id}',
        headers={'Authorization': f'Bearer {token}'}
    )
    del_data = del_resp.get_json()
    assert del_resp.status_code == 200
    assert 'message' in del_data and del_data['message'] == 'CV deleted successfully'


def test_cv_delete_not_found(client, test_user):
    """
    Attempt to delete a non-existent CV.
    Expect a 404 with an error message.
    """
    token = generate_jwt_token(test_user)
    delete_resp = client.delete(
        '/cv/nonexistent_cv_id',
        headers={'Authorization': f'Bearer {token}'}
    )
    del_data = delete_resp.get_json()
    assert delete_resp.status_code == 404
    assert 'error' in del_data
    assert del_data['error'] == 'CV not found or you do not have permission to delete it'
