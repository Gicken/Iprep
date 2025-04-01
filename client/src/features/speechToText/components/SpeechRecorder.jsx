import React from "react";

const SpeechRecorder = ({ recording, startRecording, stopRecording }) => {
  return (
    <button
      onClick={recording ? stopRecording : startRecording}
      className={`px-4 py-2 rounded ${
        recording ? "bg-red-500" : "bg-green-500"
      } text-white`}
    >
      {recording ? "Stop Recording" : "Start Recording"}
    </button>
  );
};

export default SpeechRecorder;
