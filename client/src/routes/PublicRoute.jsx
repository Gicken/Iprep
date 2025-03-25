import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PublicRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Show a loading spinner while authentication status is being checked
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p className="text-white">Loading...</p>
  //     </div>
  //   );
  // }

  // Redirect to dashboard if the user is already authenticated
  if (isAuthenticated && location==='/login' || location==='/registration') {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;