import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/auth/context/AuthContext';
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaFileAlt,
  FaCommentAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaUsersCog,
  FaTimes,
  FaBars
} from 'react-icons/fa';

const DashboardNavbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (path) =>
    location.pathname === path ? 'text-[#59FF00] font-bold' : 'text-gray-400';

  const navLinks = [
    {
      path: '/dashboard',
      icon: <FaHome className="h-6 w-6 mr-2" />,
      label: 'Dashboard',
    },
    {
      path: '/dashboard/start',
      icon: <FaUserShield className="h-6 w-6 mr-2" />,
      label: 'Practice Interviews',
    },
    {
      path: '/dashboard/history',
      icon: <FaHistory className="h-6 w-6 mr-2" />,
      label: 'Interview History',
    },
    {
      path: '/dashboard/cv-manager',
      icon: <FaFileAlt className="h-6 w-6 mr-2" />,
      label: 'CV Manager',
    },
    {
      path: '/dashboard/feedback',
      icon: <FaCommentAlt className="h-6 w-6 mr-2" />,
      label: 'Feedback',
    },
    {
      path: '/dashboard/profile',
      icon: <FaUsersCog className="h-6 w-6 mr-2" />,
      label: 'Profile',
    },
  ];

  return (
    <aside
      className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 p-4' : 'w-20 p-2'
      } bg-gray-900 rounded-3xl m-4 mt-0 mb-0 h-120 fixed flex flex-col justify-between shadow-lg`}
    >
      <div className="flex justify-center items-center mb-4">
        <button 
          onClick={toggleSidebar} 
          className="text-gray-400 hover:text-white focus:outline-none"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>
      </div>

      <nav>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass(link.path)}`}
            aria-current={location.pathname === link.path ? 'page' : undefined}
          >
            {link.icon}
            {isSidebarOpen && link.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4">
        <button 
          onClick={handleLogout} 
          className="flex items-center p-2 hover:bg-gray-800 rounded w-full text-red-500"
          aria-label="Logout"
        >
          <FaSignOutAlt className="h-6 w-6 mr-2" />
          {isSidebarOpen && 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default DashboardNavbar;