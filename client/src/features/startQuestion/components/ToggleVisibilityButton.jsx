// ToggleVisibilityButton.js
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ToggleVisibilityButton = ({ isVisible, toggleVisibility }) => (
    <button
        onClick={toggleVisibility}
        className="bg-gray-700 text-white px-4 py-2 rounded flex items-center space-x-2"
    >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
        <span>{isVisible ? "Hide" : "Show"} Transcription & Chat</span>
    </button>
);

export default ToggleVisibilityButton;
