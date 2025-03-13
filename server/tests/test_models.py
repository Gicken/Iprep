# ----------------------------------------
#           MODEL TESTS BELOW
# ----------------------------------------
# Using this file to test my models
# ----------------------------------------

from werkzeug.security import check_password_hash
from app.models.user import User
import pytest

def test_create_user(db_session):
    """Test user creation and password hashing."""
    user = User(
        firstName="John",
        lastName="Doe",
        email="john.doe@example.com",
        password="securepassword123"
    )

    assert user.firstName == "John"
    assert user.lastName == "Doe"
    assert user.email == "john.doe@example.com"
    assert user.password_hash != "securepassword123"  # Ensure password is hashed

    db_session.add(user)
    db_session.commit()

    saved_user = db_session.query(User).filter_by(email="john.doe@example.com").first()
    assert saved_user is not None
    assert check_password_hash(saved_user.password_hash, "securepassword123")  # Verify password

def test_password_hashing(db_session):
    """Ensure password hash changes and matches the original password."""
    user1 = User(firstName="Alice", lastName="Smith", email="alice@example.com", password="mypassword")
    user2 = User(firstName="Bob", lastName="Brown", email="bob@example.com", password="mypassword")

    db_session.add_all([user1, user2])
    db_session.commit()

    assert user1.password_hash != user2.password_hash  # Hash should be unique
    assert user1.check_password("mypassword") is True
    assert user1.check_password("wrongpassword") is False

def test_uuid_generation(db_session):
    """Ensure UUIDs are generated correctly and unique."""
    user1 = User(firstName="Alice", lastName="Smith", email="alice@example.com", password="mypassword")
    user2 = User(firstName="Bob", lastName="Brown", email="bob@example.com", password="mypassword")

    db_session.add_all([user1, user2])
    db_session.commit()

    assert user1.id != user2.id  # Ensure UUIDs are unique
    assert len(str(user1.id)) == 36  # UUID length is 36 chars

def test_duplicate_email_not_allowed(db_session):
    """Ensure users cannot have duplicate emails."""
    user1 = User(firstName="Alice", lastName="Smith", email="duplicate@example.com", password="securepass")
    user2 = User(firstName="Bob", lastName="Brown", email="duplicate@example.com", password="securepass")

    db_session.add(user1)
    db_session.commit()

    db_session.add(user2)
    with pytest.raises(Exception):  # Expecting IntegrityError due to unique constraint
        db_session.commit()

def test_user_authentication(db_session):
    """Ensure user authentication works correctly."""
    user = User(firstName="John", lastName="Doe", email="auth@example.com", password="testpassword")
    db_session.add(user)
    db_session.commit()

    saved_user = db_session.query(User).filter_by(email="auth@example.com").first()
    assert saved_user is not None
    assert saved_user.check_password("testpassword") is True
    assert saved_user.check_password("wrongpassword") is False

def test_user_update(db_session):
    """Ensure user details can be updated."""
    user = User(firstName="Jane", lastName="Doe", email="update@example.com", password="updatepass")
    db_session.add(user)
    db_session.commit()

    user.firstName = "Janet"
    user.lastName = "Smith"
    db_session.commit()

    updated_user = db_session.query(User).filter_by(email="update@example.com").first()
    assert updated_user.firstName == "Janet"
    assert updated_user.lastName == "Smith"

def test_user_deletion(db_session):
    """Ensure a user can be deleted."""
    user = User(firstName="Mark", lastName="Spencer", email="delete@example.com", password="deletepass")
    db_session.add(user)
    db_session.commit()

    db_session.delete(user)
    db_session.commit()

    deleted_user = db_session.query(User).filter_by(email="delete@example.com").first()
    assert deleted_user is None

def test_invalid_password_check(db_session):
    """Ensure invalid passwords do not authenticate users."""
    user = User(firstName="Invalid", lastName="Tester", email="invalid@example.com", password="correctpass")
    db_session.add(user)
    db_session.commit()

    saved_user = db_session.query(User).filter_by(email="invalid@example.com").first()
    assert saved_user is not None
    assert saved_user.check_password("wrongpassword") is False