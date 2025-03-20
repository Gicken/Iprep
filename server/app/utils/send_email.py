from flask_mail import Message, Mail
from flask import current_app

mail = Mail()

def send_email(to_email, subject, body):
    """Send an email using Flask-Mail."""
    msg = Message(
        subject=subject,
        recipients=[to_email],
        body=body,
        sender=current_app.config["MAIL_DEFAULT_SENDER"]
    )
    try:
        mail.send(msg)
        print(f"✅ Email sent to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False
