import re
import string
from typing import List, Dict, Set
from collections import defaultdict

class FeedbackProcessor:
    """
    Advanced feedback processing class with sophisticated categorization techniques.
    """
    
    # Comprehensive lexical resources
    STRENGTH_INDICATORS: Set[str] = {
        'good', 'great', 'excellent', 'strong', 'positive', 
        'well done', 'impressive', 'effective', 'solid', 'success', 
        'powerful', 'robust', 'outstanding', 'clear', 'perfect', 
        'brilliant', 'superb', 'exceptional', 'high-quality', 'precise',
        'comprehensive', 'thorough', 'insightful', 'elegant', 'efficient'
    }
    
    IMPROVEMENT_INDICATORS: Set[str] = {
        'improve', 'weak', 'needs work', 'lacking', 'could be better', 
        'missing', 'gap', 'limitation', 'challenge', 'problem',
        'insufficient', 'unclear', 'ineffective', 'improvement',
        'should improve', 'can be enhanced', 'needs refinement',
        'underdeveloped', 'incomplete', 'requires attention', 
        'falls short', 'needs modification', 'potential issue'
    }
    
    RECOMMENDATION_INDICATORS: Set[str] = {
        'recommend', 'suggest', 'consider', 'propose', 'advise', 
        'could', 'should', 'might', 'potential', 'improvement',
        'try', 'attempt', 'perhaps', 'possibly', 'recommendation',
        'would suggest', 'best practice', 'strategic', 'optimize',
        'enhance', 'refine', 'modify', 'alternative approach'
    }
    
    @classmethod
    def _preprocess_text(cls, text: str) -> str:
        """
        Preprocess the input text for analysis.
        
        Args:
            text (str): Input feedback text
        
        Returns:
            str: Cleaned and normalized text
        """
        # Remove extra whitespaces
        text = re.sub(r'\s+', ' ', text).strip()
        
        # Remove punctuation except periods, exclamation marks, and question marks
        text = re.sub(r'[^\w\s.!?]', '', text)
        
        return text.lower()
    
    @classmethod
    def _split_sentences(cls, text: str) -> List[str]:
        """
        Advanced sentence splitting with multiple strategies.
        
        Args:
            text (str): Input text
        
        Returns:
            List[str]: List of sentences
        """
        # Multiple splitting strategies
        strategies = [
            # Standard sentence splitting
            r'(?<=[.!?])\s+',
            # Split on semicolons and specific conjunctions
            r'(?<=[.!?;])\s+|\s*(?:and|but|however)\s+'
        ]
        
        sentences = []
        for strategy in strategies:
            candidate_sentences = re.split(strategy, text, flags=re.IGNORECASE)
            sentences.extend(candidate_sentences)
        
        # Clean and filter sentences
        sentences = [
            sentence.strip() 
            for sentence in sentences 
            if sentence.strip() and len(sentence.split()) > 1
        ]
        
        return sentences
    
    @classmethod
    def process_feedback(cls, feedback_text: str) -> str:
        """
        Process feedback with advanced categorization techniques.
        
        Args:
            feedback_text (str): Raw feedback text
        
        Returns:
            str: Structured and formatted feedback
        """
        # Preprocess the text
        preprocessed_text = cls._preprocess_text(feedback_text)
        
        # Split into sentences
        sentences = cls._split_sentences(preprocessed_text)
        
        # Initialize sections with default structure
        sections: Dict[str, List[str]] = {
            "Strengths": [],
            "Areas for Improvement": [],
            "Recommendations": []
        }
        
        # Advanced scoring mechanism
        for sentence in sentences:
            # Compute nuanced section scores
            scores = {
                "Strengths": sum(1 for word in cls.STRENGTH_INDICATORS if word in sentence),
                "Areas for Improvement": sum(1 for word in cls.IMPROVEMENT_INDICATORS if word in sentence),
                "Recommendations": sum(1 for word in cls.RECOMMENDATION_INDICATORS if word in sentence)
            }
            
            # Weighted scoring with contextual intelligence
            section_match = max(scores, key=lambda k: (
                scores[k],  # Primary: number of indicator matches
                -abs(len(sentence) - 50)  # Secondary: prefer sentences of moderate length
            ))
            
            # Contextual fallback and refinement
            if scores[section_match] == 0:
                # More sophisticated section determination
                if any(word in sentence for word in cls.STRENGTH_INDICATORS):
                    section_match = "Strengths"
                elif any(word in sentence for word in cls.IMPROVEMENT_INDICATORS):
                    section_match = "Areas for Improvement"
                elif any(word in sentence for word in cls.RECOMMENDATION_INDICATORS):
                    section_match = "Recommendations"
                else:
                    # Final fallback prioritizing informativeness
                    section_match = "Recommendations"
            
            # Prevent duplicate entries and maintain uniqueness
            if sentence not in sections[section_match]:
                sections[section_match].append(sentence)
        
        # Ensure meaningful content in each section
        for key in sections:
            if not sections[key]:
                default_messages = {
                    "Strengths": ["No specific strengths noted."],
                    "Areas for Improvement": ["No areas for improvement identified."],
                    "Recommendations": ["No specific recommendations provided."]
                }
                sections[key] = default_messages[key]
        
        # Format feedback with consistent structure
        formatted_feedback = (
            f"**Strengths:**\n" + 
            "\n".join(sections["Strengths"]) + "\n\n" +
            f"**Areas for Improvement:**\n" + 
            "\n".join(sections["Areas for Improvement"]) + "\n\n" +
            f"**Recommendations:**\n" + 
            "\n".join(sections["Recommendations"])
        )
        
        return formatted_feedback