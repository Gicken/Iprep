import os
import ffmpeg
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"wav", "mp3", "m4a"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def save_audio_file(file):
    """ Saves and converts the uploaded file if needed """
    if not allowed_file(file.filename):
        raise ValueError("Invalid file format. Allowed: wav, mp3, m4a")

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    # Convert to WAV if not already in that format
    if not filename.endswith(".wav"):
        wav_path = os.path.join(UPLOAD_FOLDER, f"{os.path.splitext(filename)[0]}.wav")
        ffmpeg.input(filepath).output(wav_path).run(overwrite_output=True)
        os.remove(filepath)  # Delete original after conversion
        return wav_path

    return filepath  # Return original if already WAV