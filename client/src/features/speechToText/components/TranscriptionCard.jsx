import React from "react";

const TranscriptionCard = ({ text }) => {
  return (
    <div className="p-4 bg-gray-800 rounded">
      <h3 className="text-lg font-semibold text-white">Transcription:</h3>
      <p className="text-gray-300">{text || "No transcription yet"}</p>
    </div>
  );
};

export default TranscriptionCard;
