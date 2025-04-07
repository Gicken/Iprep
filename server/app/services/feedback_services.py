from openai import OpenAI
import json
from typing import List, Dict

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
    def process_feedback(cls, feedback_text: str, question: str = None, answer: str = None) -> str:
        """
        Process feedback using AI to generate structured feedback in three categories.
        
        Args:
            feedback_text (str): Raw feedback text
            question (str, optional): The interview question that was asked
            answer (str, optional): The user's answer to the question
        
        Returns:
            str: Structured and formatted feedback
        """
        # Initialize OpenAI client
        client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")
        
        # Prepare the prompt with context if available
        prompt_content = f"Analyze the following feedback and structure it into three categories - strengths, areas for improvement, and recommendations:"
        
        if question and answer:
            prompt_content = (
                f"For the interview question: \"{question}\"\n"
                f"The candidate answered: \"{answer}\"\n"
                f"Based on the following feedback: \"{feedback_text}\"\n"
                f"Provide a structured analysis of the response with specific strengths, areas for improvement, and actionable recommendations."
            )
        else:
            prompt_content = f"Analyze the following feedback and structure it into three categories:\n\"{feedback_text}\""
        
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
        
        # Parse the AI response
        feedback_data = json.loads(response.choices[0].message.content)
        
        # Format feedback with consistent structure
        formatted_feedback = (
            f"**Strengths:**\n" + 
            "\n".join(f"- {strength}" for strength in feedback_data["strengths"]) + "\n\n" +
            f"**Areas for Improvement:**\n" + 
            "\n".join(f"- {improvement}" for improvement in feedback_data["improvements"]) + "\n\n" +
            f"**Recommendations:**\n" + 
            "\n".join(f"- {recommendation}" for recommendation in feedback_data["recommendations"])
        )
        
        return formatted_feedback