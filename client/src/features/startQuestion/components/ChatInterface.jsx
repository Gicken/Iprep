// ChatInterface.js
import React from "react";

const ChatInterface = ({ transcript, setTranscript, handleSubmit }) => (
    <div className="bg-gray-800 p-6 rounded shadow mt-4">
        <h2 className="text-xl font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg text-center">
            Chat Interface
        </h2>
        <textarea
            className="w-full bg-black text-white p-3 rounded border-gray-600"
            rows="4"
            placeholder="Type your response or use voice input..."
            value={transcript} // Auto-fills with transcribed text
            onChange={(e) => setTranscript(e.target.value)}
        />
        <button
            onClick={handleSubmit}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
            Submit Response
        </button>
    </div>
);

export default ChatInterface;
