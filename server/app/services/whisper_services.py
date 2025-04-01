import whisper
from flask_jwt_extended import get_jwt_identity
from app.models.UserResponse import UserResponse
from app.exts import db
from app.utils.file_handler import save_audio_file
from sqlalchemy.exc import SQLAlchemyError
from flask import jsonify, send_file
from io import BytesIO


whisper_model = whisper.load_model("small")

def transcribe_audio(file):
    """ Handles the transcription process """
    user_id = get_jwt_identity()
    if not user_id:
        return {"message":"Unauthorized: User ID not found"}, 401

    filepath = save_audio_file(file)
    
    with open(filepath, "rb") as f:
        audio_blob = f.read()
        
    result = whisper_model.transcribe(filepath)
    text = result["text"]

    transcription = UserResponse(user_id=user_id, filename=file.filename, text=text, audio_blob=audio_blob, file_path=filepath)
    
    db.session.add(transcription)
    db.session.commit()

    return {
        "id": transcription.id,
        "user_id": transcription.user_id,
        "text": transcription.text,
        "filename": transcription.filename
    }, 201

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
    
# if the audio folder is deleted we can recover it using below route
def recover_audio(transcription_id):
    """ Retrieves an audio file from the database blob storage """
    response = UserResponse.query.filter_by(id=transcription_id).first()
    
    if not response or not response.audio_blob:
        return {"message": "Audio not found"}, 404
    
    return send_file(
        BytesIO(response.audio_blob),
        mimetype='audio/wav',
        as_attachment=True,
        download_name=response.filename
    )