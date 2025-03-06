import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/ComingSoon.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  console.log("Dashboard:", user)
  return (
    <div>
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-message">
          This page is currently under development. Stay tuned for updates!
        </p>
        <div className="loading-spinner">
          <div className="spinner-inner"></div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="mt-1 px-2 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
    
    </div>
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    //   <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>

    //   {user ? (
    //     <div className="mt-4 p-4 bg-white rounded shadow-md">
    //       <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
    //       <p><strong>Email:</strong> {user.email}</p>
    //       <p><strong>Role:</strong> {user.role}</p>
    //     </div>
    //   ) : (
    //     <p>Loading user details...</p>
    //   )}
  );
};
export default Dashboard;
