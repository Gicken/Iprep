import React from 'react';
import '../../../assets/styles/components/Button.css';

const SecondaryButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      className={`btn-secondary border border-[#54cb33] text-[#54cb33] px-4 py-2 rounded-md font-semibold hover:bg-[#54cb33] hover:text-[#1A1C1B] transition duration-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;