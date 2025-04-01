import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ShowPasswordToggle = ({ showPassword, onClick }) => {
  return (
    <button
      type="button"
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
      onClick={onClick}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default ShowPasswordToggle;