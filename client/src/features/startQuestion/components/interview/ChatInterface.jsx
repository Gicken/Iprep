import React from 'react';

const ChatInterface = ({ transcript, setTranscript, onSubmit }) => {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg text-center">
        Chat Interface
      </h2>
      <textarea
        className="w-full bg-gray-900 text-white p-3 rounded border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        rows="4"
        placeholder="Type your response or use voice input..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={onSubmit}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition-colors disabled:opacity-50"
        disabled={!transcript.trim()}
      >
        Submit Response
      </button>
    </div>
  );
};

export default ChatInterface;