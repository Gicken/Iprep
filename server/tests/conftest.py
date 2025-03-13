import pytest
from app import create_app
from app.exts import db  # Import your SQLAlchemy instance
from app.models.user import User  # Import models

@pytest.fixture(scope="session")
def app():
    """Create a new app instance for the test session"""
    app = create_app("testing")  # Use the 'testing' config
    with app.app_context():
        db.create_all()  # Create all tables
        yield app
        db.session.remove()
        db.drop_all()  # Drop tables after tests

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
        db.session.rollback()  # Undo uncommitted transactions
        for table in reversed(db.metadata.sorted_tables):
            db.session.execute(table.delete())  # Delete all records
        db.session.commit()