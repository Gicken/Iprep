import React from 'react';
import '../../../assets/styles/components/Button.css';

const PrimaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`btn-primary bg-[#59FF00] text-[#1A1C1B] px-4 py-2 rounded-md font-semibold hover:bg-[#54cb33] transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;