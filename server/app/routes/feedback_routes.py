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
    'response_id': fields.String(required=True, description='ID of user response'),
})

def serialize_feedback(feedback):
    """Helper function to make responses"""
    return {
        'id': feedback.id,
        'user_id': feedback.user_id,
        'response_id':feedback.response_id,
        'feedbackStrength': feedback.feedbackStrength,
        'feedbackImprove': feedback.feedbackImprove,
        'feedbackRecommendation': feedback.feedbackRecommendation,
    }

@feedback_ns.route('')
class FeedbackList(Resource):
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def get(self):
        """Get all feedback for the current user"""
        current_user_id = get_jwt_identity()
        feedbacks = Feedback.query.filter_by(user_id=current_user_id).all()

        return [serialize_feedback(fb) for fb in feedbacks], 200
@feedback_ns.route('/<string:response_id>')
class FeedbackList(Resource):
    @feedback_ns.doc(security='BearerAuth')
    @jwt_required()
    def post(self, response_id):
        """Generate AI feedback"""
        current_user_id = get_jwt_identity()
        # Process AI feedback
        generated_feedback = FeedbackProcessor.generate_feedback(response_id)

        new_feedback = Feedback(
            user_id=current_user_id,
            response_id=response_id,
            feedbackStrength=generated_feedback.get("strengths"),
            feedbackImprove=generated_feedback.get("improvements"),
            feedbackRecommendation=generated_feedback.get("recommendations")
        )

        try:
            print("____________________________________________________________________________________________________________")
            print(new_feedback.feedbackImprove)
            print("____________________________________________________________________________________________________________")
            # return generated_feedback.get("strengths")
            db.session.add(new_feedback)
            db.session.commit()
            return  serialize_feedback(new_feedback), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 500

# @feedback_ns.route('/<string:feedback_id>')
# class FeedbackItem(Resource):
#     @feedback_ns.doc(security='BearerAuth')
#     @jwt_required()
#     def get(self, feedback_id):
#         """Retrieve a specific feedback entry"""
#         current_user_id = get_jwt_identity()
#         feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

#         if not feedback:
#             return {'error': 'Feedback not found'}, 404

#         return {
#             'id': feedback.id,
#             'question': feedback.question,
#             'answer': feedback.answer,
#             'feedback': feedback.feedback,
#             'created_at': feedback.created_at.strftime('%Y-%m-%d %H:%M:%S')
#         }, 200

#     @feedback_ns.expect(feedback_model)
#     @feedback_ns.doc(security='BearerAuth')
#     @jwt_required()
#     def put(self, feedback_id):
#         """Update an existing feedback entry"""
#         current_user_id = get_jwt_identity()
#         feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

#         if not feedback:
#             return {'error': 'Feedback not found'}, 404

#         data = request.json
#         feedback.question = data.get('question', feedback.question)
#         feedback.answer = data.get('answer', feedback.answer)
#         feedback.feedback = data.get('feedback', feedback.feedback)

#         try:
#             db.session.commit()
#             return {'message': 'Feedback updated successfully'}, 200
#         except Exception as e:
#             db.session.rollback()
#             return {'error': str(e)}, 500

    # @feedback_ns.doc(security='BearerAuth')
    # @jwt_required()
    # def delete(self, feedback_id):
    #     """Delete a feedback entry"""
    #     current_user_id = get_jwt_identity()
    #     feedback = Feedback.query.filter_by(id=feedback_id, user_id=current_user_id).first()

    #     if not feedback:
    #         return {'error': 'Feedback not found'}, 404

    #     try:
    #         db.session.delete(feedback)
    #         db.session.commit()
    #         return {'message': 'Feedback deleted successfully'}, 200
    #     except Exception as e:
    #         db.session.rollback()
    #         return {'error': str(e)}, 500
