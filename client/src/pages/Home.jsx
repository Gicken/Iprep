import React from 'react';
import { NavLink } from 'react-router-dom';
import imagePath from '../assets/images/artificial-intelligence-icon-png-14771.png';
import '../assets/styles/Homepage.css';

const Home = () => {
  return (
    // <div className="flex items-start justify-center flex-grow bg-[#1A1C1B] text-white">
    <div className="flex items-center justify-center bg-[#1A1C1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Left Side */}
        <div className="w-1/2 pr-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Your AI-Powered Assistant
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Practice and perfect your interview skills with FDM's AI-powered interview tool. Get personalized feedback and guidance to get ready for the client.
          </p>
          <NavLink to="/login">
          <button className="btn-primary">Sign In</button></NavLink>
        </div>

        {/* Right Side */}
        <div className="w-1/2">
          <img src={imagePath} alt="AI Assistant" className="w-full" />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Home;