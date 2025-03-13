# ---------------------------------------------------------
#           CONFIGURATION TEST FILE BELOW
# ---------------------------------------------------------
# Using this file to write configurations for my tests
# ---------------------------------------------------------

import pytest
from app import create_app
from app.exts import db
from app.models.user import User

@pytest.fixture(scope="session")
def app():
    """Create a new app instance for the test session"""
    app = create_app("testing")  # Use the 'testing' config
    with app.app_context():
        db.create_all() 
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """Returns a test client that can send HTTP requests"""
    return app.test_client()

@pytest.fixture
def runner(app):
    """Returns a test CLI runner"""
    return app.test_cli_runner()

@pytest.fixture(autouse=True)
def clean_db(app):
    """Clear database tables before each test"""
    with app.app_context():
        db.session.rollback() 
        for table in reversed(db.metadata.sorted_tables):
            db.session.execute(table.delete())
        db.session.commit()

@pytest.fixture
def db_session(app):
    """Returns a session that is rolled back after each test"""
    with app.app_context():
        session = db.session
        yield session
        session.rollback()