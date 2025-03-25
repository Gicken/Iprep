import React from 'react';
import { Link } from 'react-router-dom';

const QuickStart = () => {
  return (
    <div className="bg-gray-800 rounded-md p-6">
      <h2 className="text-xl text-center font-semibold mb-4 border-y border-gray-600 py-2 px-4 rounded-lg">
        Quick Start
      </h2>
      <Link to="/dashboard/start" className="btn-primary align-items-center">
        Start New Interview
      </Link>
    </div>
  );
};

export default QuickStart;