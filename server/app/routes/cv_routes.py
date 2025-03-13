from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from werkzeug.datastructures import FileStorage

from app.exts import db
from app.models.user import User
from ..models.CV import CV

# Create the namespace for CV-related routes
cv_ns = Namespace('cv', description='CV related operations')

upload_parser = cv_ns.parser()
upload_parser.add_argument('file', location='files', type=FileStorage, required=True, help='CV file to upload')


# Define CV model for API responses
cv_model = cv_ns.model('CV', {
    'id': fields.String(readOnly=True, description='CV ID'),
    'file_name': fields.String(required=True, description='Name of the CV file'),
    'upload_date': fields.DateTime(readOnly=True, description='CV upload timestamp'),
    'user_id': fields.String(required=True, description='ID of the user who uploaded the CV')
})

# Define CV upload input model
cv_upload_model = cv_ns.model('CVUpload', {
    'file': fields.String(required=True, description='CV file to upload')
})

@cv_ns.route('/upload')
class CVUpload(Resource):
    @cv_ns.expect(upload_parser)
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

            # Read the file content into memory
            file_content = file.read()

            # Create CV record and link to user, storing file content
            new_cv = CV(
                file_name=filename,
                file_data=file_content,
                user_id=current_user_id
            )
            
            try:
                db.session.add(new_cv)
                db.session.commit()
                return {
                    'message': 'CV uploaded successfully', 
                    'cv_id': new_cv.id,
                    'file_name': new_cv.file_name
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
            'file_name': cv.file_name,
            'upload_date': cv.upload_date.strftime('%Y-%m-%d %H:%M:%S') if cv.upload_date else None
        } for cv in cvs]
        
        return cv_list, 200

# @cv_ns.route('/<string:cv_id>/download')
# class CVDownload(Resource):
#     @cv_ns.doc(security='BearerAuth')
#     @jwt_required()
#     def get(self, cv_id):
#         """Download a CV by ID"""
#         current_user_id = get_jwt_identity()

#         cv = CV.query.filter_by(id=cv_id, user_id=current_user_id).first()

#         if not cv:
#             return {'error': 'CV not found'}, 404

#         from flask import send_file
#         import io

#         return send_file(
#             io.BytesIO(cv.file_data),
#             mimetype='application/octet-stream',
#             as_attachment=True,
#             download_name=cv.file_name
#         )