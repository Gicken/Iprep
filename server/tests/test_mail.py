import unittest
from app import create_app
from flask_mail import Message, Mail

class TestMailSending(unittest.TestCase):

    def setUp(self):
        # Initialize the app
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

        # Access the mail instance from the app context
        self.mail = Mail(self.app)

    def tearDown(self):
        # Pop the app context after the test
        self.app_context.pop()

    def test_send_email(self):
        # Create a test email message
        msg = Message('Test Email', sender='your_email@example.com', recipients=['recipient@example.com'])
        msg.body = 'This is a test email.'

        # Use 'mail.send(msg)' to send the email
        self.mail.send(msg)  # Use the mail instance from self.app
    
if __name__ == '__main__':
    unittest.main()