// Transcription.js
import React from "react";

const Transcription = ({ transcript }) => (
    <div className="bg-gray-800 p-6 rounded shadow mt-4">
        <h2 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-2">
            Transcribed Text
        </h2>
        <p className="text-gray-300">{transcript}</p>
    </div>
);

export default Transcription;
