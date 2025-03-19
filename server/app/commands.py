from flask.cli import with_appcontext
import click
from app.models.user import User
from app.exts import db

@click.command("seed-db")
@with_appcontext
def seed_db():
    """Seeds the database with initial data."""
    
    # seed data  
    if not User.query.filter_by(email='admin@example.com').first():
        admin = User(
            firstName='Admin',
            lastName='User',
            email='admin@example.com',
            password='adminpassword'
        )
        admin.role='admin'
        db.session.add(admin)
        db.session.commit()
        print("Admin user seeded.")
    else:
        print("Admin user already exists.")
        
    if not User.query.filter_by(email='luthandolincoln@gmail.com').first():
        test = User(
            firstName='Test',
            lastName='Testing',
            email='luthandolincoln@gmail.com',
            password='testing123'
            # new password would be 123@tester
        )
        test.role='test-user'
        db.session.add(test)
        db.session.commit()
        print("Test user seeded.")
    else:
        print("Test user already exists.")