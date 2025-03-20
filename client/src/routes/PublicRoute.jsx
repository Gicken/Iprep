import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log("✅ PUBLIC ROUTE:", isAuthenticated);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
};

export default PublicRoute;