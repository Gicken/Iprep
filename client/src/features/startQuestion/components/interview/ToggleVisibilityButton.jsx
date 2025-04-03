import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ToggleVisibilityButton = ({ isVisible, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label={isVisible ? 'Hide transcription' : 'Show transcription'}
      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center space-x-2 transition-colors"
    >
      {isVisible ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
      <span>{isVisible ? 'Hide' : 'Show'} Transcription</span>
    </button>
  );
};

export default ToggleVisibilityButton;