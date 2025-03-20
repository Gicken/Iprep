import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logoPath from "../assets/images/FDM_Logo_White_RGB.png";
import iconPath from "../assets/images/profile.png";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const user = JSON.parse(sessionStorage.getItem("user")) || {};

  return (
    <nav className="bg-[#1A1C1B] mb-10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white font-bold text-xl flex items-center">
                <img src={logoPath} className="max-h-12 mr-2" alt="FDM Logo"/>
            </NavLink>
          </div>
          <div className="flex items-center justify-center">
            <div className="hidden md:flex space-x-4">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>Home</NavLink>
              <NavLink to="/how-it-works" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>How It Works</NavLink>
              <NavLink to="/faqs" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>FAQ's</NavLink>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>Dashboard</NavLink>

            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="btn-primary mr-2">
                  Login
                </NavLink>
                <NavLink to="/registration" className="btn-secondary">
                  Signup
                </NavLink>
              </>
            ) : (
              <div className="flex items-center color: #d1d5db;">
                <NavLink to="/dashboard/profile">
                  <img
                    src={iconPath}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                </NavLink>
                <NavLink className="nav-link" to="/dashboard/profile">
                  {user.firstName || "Guest"} {user.lastName || ""}
                  </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
