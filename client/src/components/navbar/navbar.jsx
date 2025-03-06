import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/NavbarStyles.css';

const Navbar = () => {
  return (
    <nav className="bg-[#1A1C1B] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white font-bold text-xl">FDM</NavLink>
            {/* <img src={imagePath} alt="AI Assistant"/> */}
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="hidden md:flex space-x-4">
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>Home</NavLink>
              <NavLink to="/comingsoon" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>How It Works</NavLink>
              <NavLink to="/comingsoon" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>FAQ's</NavLink>
            </div>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <NavLink to="/login" className="btn-primary mr-2">Login</NavLink>
            <NavLink to="/registration" className="btn-secondary">Signup</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
