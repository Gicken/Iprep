import re

def process_feedback(feedback_text):
    """
    Advanced feedback processing function that intelligently categorizes 
    feedback across different sections.
    
    Args:
        feedback_text (str): Raw feedback text to be processed
    
    Returns:
        dict: Structured feedback categories
    """
    # Comprehensive keyword sets for section detection
    STRENGTH_INDICATORS = {
        'good', 'great', 'excellent', 'strong', 'positive', 
        'well done', 'impressive', 'effective', 'solid', 'success', 
        'powerful', 'robust', 'outstanding', 'clear', 'perfect'
    }
    
    IMPROVEMENT_INDICATORS = {
        'improve', 'weak', 'needs work', 'lacking', 'could be better', 
        'missing', 'gap', 'limitation', 'challenge', 'problem',
        'insufficient', 'unclear', 'ineffective', 'needs improvement',
        'should improve', 'can be enhanced'
    }
    
    RECOMMENDATION_INDICATORS = {
        'recommend', 'suggest', 'consider', 'propose', 'advise', 
        'could', 'should', 'might', 'potential', 'improvement',
        'try', 'attempt', 'perhaps', 'possibly', 'recommendation'
    }
    
    # Initialize sections
    sections = {
        "Strengths": [],
        "Areas for Improvement": [],
        "Recommendations": []
    }
    
    # Preprocess the text
    feedback_text = feedback_text.strip()
    
    # Split sentences (basic approach)
    sentences = re.split(r'(?<=[.!?])\s+', feedback_text)
    
    # Process each sentence
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
        
        # Normalize sentence for keyword matching
        sentence_lower = sentence.lower()
        
        # Compute section scores
        scores = {
            "Strengths": sum(1 for word in STRENGTH_INDICATORS if word in sentence_lower),
            "Areas for Improvement": sum(1 for word in IMPROVEMENT_INDICATORS if word in sentence_lower),
            "Recommendations": sum(1 for word in RECOMMENDATION_INDICATORS if word in sentence_lower)
        }
        
        # Determine the most likely section
        section_match = max(scores, key=scores.get)
        
        # If no clear indicators, default to appropriate section
        if scores[section_match] == 0:
            # If sentence contains specific language, assign accordingly
            if any(word in sentence_lower for word in STRENGTH_INDICATORS):
                section_match = "Strengths"
            elif any(word in sentence_lower for word in IMPROVEMENT_INDICATORS):
                section_match = "Areas for Improvement"
            elif any(word in sentence_lower for word in RECOMMENDATION_INDICATORS):
                section_match = "Recommendations"
            else:
                # Fallback to Recommendations
                section_match = "Recommendations"
        
        # Add to appropriate section if not already present
        if sentence not in sections[section_match]:
            sections[section_match].append(sentence)
    
    # Ensure each category has content
    for key in sections:
        if not sections[key]:
            if key == "Strengths":
                sections[key] = ["No specific strengths noted."]
            elif key == "Areas for Improvement":
                sections[key] = ["No areas for improvement identified."]
            else:
                sections[key] = ["No specific recommendations provided."]
    
    # Format feedback
    formatted_feedback = (
        f"**Strengths:**\n" + 
        "\n".join(sections["Strengths"]) + "\n\n" +
        f"**Areas for Improvement:**\n" + 
        "\n".join(sections["Areas for Improvement"]) + "\n\n" +
        f"**Recommendations:**\n" + 
        "\n".join(sections["Recommendations"])
    )
    
    return formatted_feedback