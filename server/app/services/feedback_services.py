from openai import OpenAI
import json
import os
from ..models.UserResponse import UserResponse
from ..models.Feedback import Feedback

from app.exts import db

class FeedbackProcessor:
    """
    Advanced feedback processing class using AI to generate structured feedback.
    """
    
    feedback_json_schema = {
        "type": "json_schema",
        "json_schema": {
            "name": "feedback",
            "schema": {
                "type": "object",
                "properties": {
                    "strengths": {
                        "type": "array",
                        "items": {"type": "string"},
                        "minItems": 1,
                    },
                    "improvements": {
                        "type": "array",
                        "items": {"type": "string"},
                        "minItems": 1,
                    },
                    "recommendations": {
                        "type": "array",
                        "items": {"type": "string"},
                        "minItems": 1,
                    }
                },
                "required": ["strengths", "improvements", "recommendations"]
            },
        }
    }
    
    @classmethod
    def generate_feedback(cls, response_id) -> str:
        """
        Generate feedback using AI to generate structured feedback in three categories.
        
        Args:
            response_id (str): the response object we are making feeback for
        Returns:
            dict: Structured and formatted feedback
        """
        #overwrite old feedback if somehow called twice
        existingFeedback = Feedback.query.filter_by(response_id=response_id).first()
        if existingFeedback:
            db.session.delete(existingFeedback)
            db.session.commit()


        user_response = UserResponse.query.filter_by(id=response_id).options(db.joinedload(UserResponse.question)).first()

        question = user_response.question.question_text
        answer = user_response.text
        context = "Nothing to add"

        
        # Initialize OpenAI client
        client = OpenAI(base_url=os.getenv("LLM_URL"), api_key=os.getenv("LLM_KEY"))
                 
        prompt_content = (
            f"Question: \"{question}\"\n"
            f"Answer: \"{answer}\"\n"
            f"Additional context:{context}\n"
        )
        
        # Generate structured feedback using AI
        response = client.chat.completions.create(
            model="qwen2.5-coder-7b-instruct",
            messages=[
                {"role": "system", "content": "You are an expert interviewer who provides detailed, constructive feedback for interview responses. Structure your feedback into three categories: strengths (what was done well), areas for improvement (what could be better), and specific recommendations (actionable advice)."},
                {"role": "user", "content": prompt_content}
            ],
            temperature=0.5,
            response_format=cls.feedback_json_schema
        )

        return json.loads(response.choices[0].message.content)