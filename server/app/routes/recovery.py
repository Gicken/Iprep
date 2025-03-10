# from flask import Blueprint, request, jsonify, url_for
# from flask_mail import Message
# import jwt
# import datetime
# from app import mail
# from app.models import users  

# recovery_bp = Blueprint('recovery', __name__)

# def generate_reset_token(email):
#     payload = {
#         'email': email,
#         'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
#     }
#     return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

# @recovery_bp.route('/recover', methods=['POST'])
# def recover_password():
#     data = request.get_json()
#     email = data.get('email')
#     if email in users:
#         token = generate_reset_token(email)
#         reset_url = url_for('recovery.reset_password', token=token, _external=True)
#         msg = Message('Password Reset Request', sender=app.config['MAIL_USERNAME'], recipients=[email])
#         msg.body = f'Click the link to reset your password: {reset_url}'
#         mail.send(msg)
#         return jsonify({'message': 'Password reset email sent'}), 200
#     return jsonify({'error': 'Email not found'}), 404

# @recovery_bp.route('/reset/<token>', methods=['POST'])
# def reset_password(token):
#     try:
#         payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
#         email = payload['email']
#         if email in users:
#             data = request.get_json()
#             new_password = data.get('password')
#             return jsonify({'message': 'Password has been reset'}), 200
#         return jsonify({'error': 'Invalid token'}), 400
#     except jwt.ExpiredSignatureError:
#         return jsonify({'error': 'Token has expired'}), 400
#     except jwt.InvalidTokenError:
#         return jsonify({'error': 'Invalid token'}), 400