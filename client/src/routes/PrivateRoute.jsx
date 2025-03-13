import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  // console.log("✅ PRIVATE ROUTE:", isAuthenticated);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("✅ PRIVATE ROUTE: IF", isAuthenticated);
    return <Navigate to="/login" replace />;
  }else{
    console.log("✅ PRIVATE ROUTE: ELSE", isAuthenticated);
    return children ? children : <Outlet />;
  }

  
};

export default PrivateRoute;
