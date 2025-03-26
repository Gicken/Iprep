import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1C1B] text-gray-400 py-8 w-full border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold">FDM Group</h3>
            <p className="text-sm">
              Empowering your career with AI-driven tools and personalized guidance.
            </p>
          </div>

          {/* Copyright (Centered) */}
          <div className="flex items-center justify-center">
            <p className="text-sm">
              &copy; {currentYear} FDM Group. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 pl-42">
            <h3 className="text-white text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">Email: support@fdmgroup.com</li>
              <li className="text-sm">Phone: +1 (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;