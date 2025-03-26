import whisper
from flask_jwt_extended import get_jwt_identity
from ..models.UserResponse import UserResponse
from ..exts import db
from ..utils.file_handler import save_audio_file
from sqlalchemy.exc import SQLAlchemyError
from flask import jsonify


whisper_model = whisper.load_model("small")

def transcribe_audio(file):
    """ Handles the transcription process """
    user_id = get_jwt_identity()
    if not user_id:
        raise ValueError("Unauthorized: User ID not found")

    filepath = save_audio_file(file)
    result = whisper_model.transcribe(filepath)
    text = result["text"]

    transcription = UserResponse(user_id=user_id, filename=file.filename, text=text)
    db.session.add(transcription)
    db.session.commit()

    return {
        "id": transcription.id,
        "user_id": transcription.user_id,
        "text": transcription.text
        # "timestamp": transcription.timestamp
    }

def get_user_transcriptions(user_id):
    """ Fetch all transcriptions for the logged-in user """
    transcriptions = UserResponse.query.filter_by(user_id=user_id).all()

    if not transcriptions:
        return {"message": "No transcriptions found"}, 404

    return jsonify([
        {
            "id": t.id,
            "user_id": t.user_id,
            "text": t.text,
            "filename": t.filename,
            "timestamp": t.timestamp.isoformat(),
        }
        for t in transcriptions
    ])

def get_transcription_by_id(transcription_id, user_id):
    """ Fetch a single transcription by ID """
    transcription = UserResponse.query.filter_by(id=transcription_id, user_id=user_id).first()

    if not transcription:
        return {"message": "Transcription not found"}, 404

    return jsonify({
        "id": transcription.id,
        "user_id": transcription.user_id,
        "text": transcription.text,
        "filename": transcription.filename,
        "timestamp": transcription.timestamp.isoformat(),
    })

# def update_transcription_text(transcription_id, user_id, new_text):
#     """ Update a transcription's text """
#     transcription = Transcription.query.filter_by(id=transcription_id, user_id=user_id).first()

#     if not transcription:
#         return {"message": "Transcription not found"}, 404

#     transcription.text = new_text

#     try:
#         db.session.commit()
#         return jsonify({
#             "id": transcription.id,
#             "user_id": transcription.user_id,
#             "text": transcription.text,
#             "filename": transcription.filename,
#             "timestamp": transcription.timestamp.isoformat(),
#         }), 200
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         return {"message": f"Database error: {str(e)}"}, 500

def delete_transcription(transcription_id, user_id):
    """ Delete a transcription """
    transcription = UserResponse.query.filter_by(id=transcription_id, user_id=user_id).first()

    if not transcription:
        return {"message": "Transcription not found"}, 404

    try:
        db.session.delete(transcription)
        db.session.commit()
        return {"message": "Transcription deleted successfully"}, 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return {"message": f"Database error: {str(e)}"}, 500