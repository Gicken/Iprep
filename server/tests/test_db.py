from app import db, create_app
from app.models.user import User

app = create_app()  # Create the app using your factory function

# Ensure app is set up with db
with app.app_context():
    print(db.engine.url)  # Now it will work inside the application context

    user = User.query.filter_by(email="muhammad.ali2@fdmgroup.com").first()
    print(user)  # Should print the user object if found