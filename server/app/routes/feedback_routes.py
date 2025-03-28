from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.exts import db
from ..models.Feedback import Feedback
from ..services.feedback_services import FeedbackProcessor

# Create namespace for feedback
feedback_ns = Namespace('feedback', description='Feedback related operations')

# Define API models
feedback_model = feedback_ns.model('Feedback', {
    'id': fields.String(readOnly=True, description='Feedback ID'),
    'question': fields.String(required=True, description='Interview question'),
    'answer': fields.String(required=True, description='User answer'),
    'feedback': fields.String(required=True, description='AI-generated feedback'),
    'created_at': fields.DateTime(readOnly=True, description='Timestamp')
})

@feedback_ns.route('')
class FeedbackList(Resource):
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        """Get all feedback for the current user"""
        current_user_id = get_jwt_identity()
        feedbacks = Feedback.query.filter_by(user_id=current_user_id).all()

        return [{
            'id': fb.id,
            'question': fb.question,
            'answer': fb.answer,
            'feedback': fb.feedback,
            'created_at': fb.created_at.strftime('%Y-%m-%d %H:%M:%S')
        } for fb in feedbacks], 200

    @feedback_ns.expect(feedback_model)
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def post(self):
        """Store AI-evaluated feedback in a structured format"""
        current_user_id = get_jwt_identity()
        data = request.json

        # Validate required fields
        required_fields = ['question', 'answer', 'feedback']
        missing_fields = [field for field in required_fields if field not in data or not data[field]]

        if missing_fields:
            return {'error': f'Missing required fields: {", ".join(missing_fields)}'}, 400

        # Process AI feedback
        structured_feedback = FeedbackProcessor.process_feedback(data['feedback'])

        new_feedback = Feedback(
            user_id=current_user_id,
            question=data['question'],
            answer=data['answer'],
            feedback=structured_feedback
        )

        try:
            db.session.add(new_feedback)
            db.session.commit()
            return {
                'id': new_feedback.id,
                'question': new_feedback.question,
                'answer': new_feedback.answer,
                'feedback': new_feedback.feedback
            }, 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

@feedback_ns.route('/<string:feedback_id>')
class FeedbackItem(Resource):
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self, feedback_id):
        """Retrieve a specific feedback entry"""
        current_user_id = get_jwt_identity()
        feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

        if not feedback:
            return {'error': 'Feedback not found'}, 404

        return {
            'id': feedback.id,
            'question': feedback.question,
            'answer': feedback.answer,
            'feedback': feedback.feedback,
            'created_at': feedback.created_at.strftime('%Y-%m-%d %H:%M:%S')
        }, 200

    @feedback_ns.expect(feedback_model)
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def put(self, feedback_id):
        """Update an existing feedback entry"""
        current_user_id = get_jwt_identity()
        feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

        if not feedback:
            return {'error': 'Feedback not found'}, 404

        data = request.json
        feedback.question = data.get('question', feedback.question)
        feedback.answer = data.get('answer', feedback.answer)
        feedback.feedback = data.get('feedback', feedback.feedback)

        try:
            db.session.commit()
            return {'message': 'Feedback updated successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def delete(self, feedback_id):
        """Delete a feedback entry"""
        current_user_id = get_jwt_identity()
        feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

        if not feedback:
            return {'error': 'Feedback not found'}, 404

        try:
            db.session.delete(feedback)
            db.session.commit()
            return {'message': 'Feedback deleted successfully'}, 200
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500
