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
            password='adminpassword',
            role='admin'
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user seeded.")
    else:
        print("Admin user already exists.")
