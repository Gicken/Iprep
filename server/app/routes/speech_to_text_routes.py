from flask import request
from flask_restx import Namespace, Resource, fields
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.whisper_services import (
    transcribe_audio,
    get_user_transcriptions,
    delete_transcription,
    get_transcription_by_id,
    recover_audio
    )

speech_ns = Namespace("speech", description="Speech-to-Text API")

response_model = speech_ns.model("Transcription", {
    "id": fields.String(description="Transcription ID"),
    "user_id": fields.String(description="User ID"),
    "text": fields.String(description="Transcribed Text"),
    "filename": fields.String(description="Original Filename"),
    "file_path": fields.String(description="Stored File Path"),
    "timestamp": fields.String(description="Timestamp"),
})

# @speech_ns.route("/transcribe")
# class SpeechToText(Resource):
#     @jwt_required()  # Require authentication
#     @speech_ns.expect(speech_ns.parser().add_argument("file", location="files", type="file", required=True))
#     # @speech_ns.response(201, "Success", response_model)
#     # @speech_ns.response(400, "Invalid file format")
#     def post(self):
#         """ Upload an audio file and transcribe it using Whisper (Requires Authentication) """
#         file = request.files.get("file")

#         if not file:
#             return {"message": "No file uploaded"}

#         try:
#             result = transcribe_audio(file)
#             return result
#         except ValueError as e:
#             return {"message": str(e)}
#         except Exception as e:
#             return {"message": f"Internal Server Error: {str(e)}"}

@speech_ns.route("/transcribe")
class SpeechToText(Resource):
    @jwt_required()
    @speech_ns.expect(speech_ns.parser().add_argument("file", location="files", type="file", required=True))
    # @speech_ns.response(201, "Success", response_model)
    # @speech_ns.response(400, "Invalid file format or missing file")
    # @speech_ns.response(500, "Internal Server Error")
    def post(self):
        """ Upload an audio file and transcribe it using Whisper (Requires Authentication) """
        file = request.files.get("file")

        if not file:
            return {"message": "No file uploaded"}

        try:
            response_data = transcribe_audio(file)
            return response_data
        except ValueError as e:
            return {"message": str(e)}
        except Exception as e:
            return {"message": f"Internal Server Error: {str(e)}"}
        
@speech_ns.route("/my-recordings")
class UserTranscriptions(Resource):
    @jwt_required()
    def get(self):
        """ Fetch all transcriptions for the logged-in user """
        return get_user_transcriptions(get_jwt_identity())
    
@speech_ns.route("/transcription/<string:transcription_id>")
class TranscriptionDetail(Resource):
    @jwt_required()
    def get(self, transcription_id):
        """ Fetch a single transcription by ID """
        return get_transcription_by_id(transcription_id, get_jwt_identity())
    
# @speech_ns.route("/update/<string:transcription_id>")
# class UpdateTranscription(Resource):
#     @jwt_required()
#     @speech_ns.expect(speech_ns.model("UpdateText", {"text": fields.String(required=True)}))
#     def put(self, transcription_id):
#         """ Update the text of a transcription """
#         return update_transcription_text(transcription_id, get_jwt_identity(), request.json.get("text"))

@speech_ns.route("/delete/<string:transcription_id>")
class DeleteTranscription(Resource):
    @jwt_required()
    def delete(self, transcription_id):
        """ Delete a transcription by ID """
        return delete_transcription(transcription_id, get_jwt_identity())
    
# if the audio folder is deleted we can recover it using below route
@speech_ns.route("/recover-audio/<string:response_id>")
class RecoverAudio(Resource):
    def get(self, transcription_id):
        """ Recover an audio file from blob storage """
        return recover_audio(transcription_id)