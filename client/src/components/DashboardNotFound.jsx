// DashboardNotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardNotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Dashboard Page Not Found</h2>
      <p className="text-gray-600 mb-6">The dashboard page you are looking for does not exist.</p>
      <Link to="/dashboard" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Go to Dashboard Home
      </Link>
    </div>
  );
};

export default DashboardNotFoundPage;
