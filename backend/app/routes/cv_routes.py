from flask import request, current_app
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import os
import uuid

from app.exts import db
from app.models.user import User
from ..models.CV import CV

# Create the namespace for CV-related routes
cv_ns = Namespace('cv', description='CV related operations')

# Define CV model for API responses
cv_model = cv_ns.model('CV', {
    'id': fields.String(readOnly=True, description='CV ID'),
    'file_path': fields.String(required=True, description='Path to the CV file'),
    'upload_date': fields.DateTime(readOnly=True, description='CV upload timestamp'),
    'user_id': fields.String(required=True, description='ID of the user who uploaded the CV')
})

# Define CV upload input model
cv_upload_model = cv_ns.model('CVUpload', {
    'file': fields.String(required=True, description='CV file to upload')
})

@cv_ns.route('/upload')
class CVUpload(Resource):
    @cv_ns.expect(cv_upload_model)
    @cv_ns.doc(security='BearerAuth')
    @jwt_required()
    def post(self):
        """Upload a CV for the current user"""
        # Get the current user's ID from the JWT token
        current_user_id = get_jwt_identity()
        
        # Check if file is present
        if 'file' not in request.files:
            return {'error': 'No file provided'}, 400

        file = request.files['file']
        if file.filename == '':
            return {'error': 'No file selected'}, 400

        # Check file type
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            
            # Create uploads directory if it doesn't exist
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            os.makedirs(upload_folder, exist_ok=True)
            
            # Generate unique filename to prevent overwriting
            unique_filename = f"{current_user_id}_{str(uuid.uuid4())}_{filename}"
            file_path = os.path.join(upload_folder, unique_filename)
            
            # Save the file
            file.save(file_path)

            # Create CV record and link to user
            new_cv = CV(
                file_path=file_path,
                user_id=current_user_id
            )
            
            try:
                db.session.add(new_cv)
                db.session.commit()
                return {
                    'message': 'CV uploaded successfully', 
                    'cv_id': new_cv.id,
                    'file_path': new_cv.file_path
                }, 201
            except Exception as e:
                db.session.rollback()
                return {'error': str(e)}, 500

    def allowed_file(self, filename):
        """Check if file extension is allowed"""
        ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc', 'txt'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@cv_ns.route('')
class CVList(Resource):
    @cv_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        """Get all CVs for the current user"""
        current_user_id = get_jwt_identity()
        
        # Fetch only CVs belonging to the current user
        cvs = CV.query.filter_by(user_id=current_user_id).all()
        
        # Serialize CV list
        cv_list = [{
            'id': cv.id,
            'file_path': cv.file_path,
            'upload_date': cv.upload_date.strftime('%Y-%m-%d %H:%M:%S') if cv.upload_date else None
        } for cv in cvs]
        
        return cv_list, 200

@cv_ns.route('/<string:cv_id>')
class CVManagement(Resource):
    @cv_ns.doc(security='BearerAuth')
    @jwt_required()
    def put(self, cv_id):
        """Update a specific CV for the current user"""
        current_user_id = get_jwt_identity()
        
        # Find the CV and ensure it belongs to the current user
        cv = CV.query.filter_by(id=cv_id, user_id=current_user_id).first()
        if not cv:
            return {'error': 'CV not found'}, 404

        if 'file' not in request.files:
            return {'error': 'No file provided'}, 400

        file = request.files['file']
        if file.filename == '':
            return {'error': 'No file selected'}, 400

        if file and self.allowed_file(file.filename):
            # Remove old file
            if os.path.exists(cv.file_path):
                os.remove(cv.file_path)

            # Save new file
            filename = secure_filename(file.filename)
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            unique_filename = f"{current_user_id}_{str(uuid.uuid4())}_{filename}"
            file_path = os.path.join(upload_folder, unique_filename)
            file.save(file_path)

            # Update CV record
            cv.file_path = file_path
            db.session.commit()

            return {'message': 'CV updated successfully', 'file_path': file_path}, 200

    @cv_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, cv_id):
        """Delete a specific CV for the current user"""
        current_user_id = get_jwt_identity()
        
        # Find the CV and ensure it belongs to the current user
        cv = CV.query.filter_by(id=cv_id, user_id=current_user_id).first()
        if not cv:
            return {'error': 'CV not found'}, 404

        # Remove file from disk
        if os.path.exists(cv.file_path):
            os.remove(cv.file_path)

        # Remove from database
        db.session.delete(cv)
        db.session.commit()

        return {'message': 'CV deleted successfully'}, 200

    def allowed_file(self, filename):
        """Check if file extension is allowed"""
        ALLOWED_EXTENSIONS = {'pdf', 'docx', 'doc', 'txt'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS