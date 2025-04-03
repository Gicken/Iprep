import VoiceRecorder from "./VoiceRecorder";

export const RecordingSection = ({ onRecordingComplete, onTranscription }) => (
    <div className="bg-gray-800 p-6 rounded shadow text-center mb-4">
      <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
        Voice Input
      </h2>
      <VoiceRecorder onTranscription={onTranscription} onRecordingComplete={onRecordingComplete} />
    </div>
  );