import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-#2A2E2E-100">
      <div
        className={`relative w-64 h-64 rounded-lg overflow-hidden cursor-pointer transition-transform ${
          isFlipped ? 'transform-gpu rotate-y-180' : ''
        }`}
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-white">404</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rotate-y-180 backface-hidden flex items-center justify-center">
          <h2 className="text-3xl font-semibold text-white">
            Oops! Page not found.
          </h2>
        </div>
      </div>
      <p className="mt-8 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;