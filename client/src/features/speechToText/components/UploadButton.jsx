import React, { useState } from "react";
import { uploadSpeech } from "../api/speechApi";

const UploadButton = ({ audioBlob, onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!audioBlob) {
      setError("No audio recorded");
      return;
    }

    setUploading(true);
    const userToken = sessionStorage.getItem("token");
    const result = await uploadSpeech(audioBlob, userToken);

    if (result.error) {
      setError(result.error);
    } else {
      setError(null);
      onUploadSuccess(result.text);
    }

    setUploading(false);
  };

  return (
    <div>
      <button onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded">
        {uploading ? "Uploading..." : "Upload & Transcribe"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UploadButton;
