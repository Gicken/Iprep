import React, { useState } from "react";
import useRecorder from "../hooks/useRecorder";
import SpeechRecorder from "../components/SpeechRecorder";
import UploadButton from "../components/UploadButton";
import TranscriptionCard from "../components/TranscriptionCard";

const SpeechToTextPage = () => {
  const { recording, audioURL, audioBlob, startRecording, stopRecording } = useRecorder();
  const [transcription, setTranscription] = useState("");

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>

      <SpeechRecorder recording={recording} startRecording={startRecording} stopRecording={stopRecording} />

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} className="w-full"></audio>
        </div>
      )}

      <UploadButton audioBlob={audioBlob} onUploadSuccess={setTranscription} />

      {transcription && <TranscriptionCard text={transcription} />}
    </div>
  );
};

export default SpeechToTextPage;
