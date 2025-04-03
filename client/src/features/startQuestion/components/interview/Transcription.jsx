import React from 'react';

const Transcription = ({ transcript = '' }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold">Transcribed Text</h2>
        <span className="text-sm text-gray-400">
          {transcript ? `${transcript.split(' ').length} words` : 'No transcription'}
        </span>
      </div>
      <div className="bg-gray-900 p-4 rounded border border-gray-700 min-h-20">
        {transcript ? (
          <p className="text-gray-300 whitespace-pre-wrap">{transcript}</p>
        ) : (
          <p className="text-gray-500 italic">Your transcription will appear here...</p>
        )}
      </div>
    </div>
  );
};

export default Transcription;