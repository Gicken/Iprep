import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { FaChalkboardUser, FaClipboardQuestion } from "react-icons/fa6";
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaFileAlt,
  FaCommentAlt,
  FaSignOutAlt,
  FaUsersCog,
  FaTimes,
  FaBars,
} from "react-icons/fa";

const DashboardNavbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = (path) =>
    location.pathname === path ? "text-[#59FF00] font-bold" : "text-gray-400";

  const navLinks = [
    { path: "/dashboard", icon: <FaHome className="h-6 w-6 mr-2" />, label: "Dashboard" },
    { path: "/dashboard/start", icon: <FaChalkboardUser className="h-6 w-6 mr-2" />, label: "Practice Interviews" },
    { path: "/dashboard/job-descriptions", icon: <FaClipboardQuestion className="h-6 w-6 mr-2" />, label: "Job Descriptions" },
    { path: "/dashboard/history", icon: <FaHistory className="h-6 w-6 mr-2" />, label: "Interview History" },
    { path: "/dashboard/cv-manager", icon: <FaFileAlt className="h-6 w-6 mr-2" />, label: "CV Manager" },
    { path: "/dashboard/feedback", icon: <FaCommentAlt className="h-6 w-6 mr-2" />, label: "Feedback" },
    { path: "/dashboard/profile", icon: <FaUsersCog className="h-6 w-6 mr-2" />, label: "Profile" },
  ];

  return (
    <aside
      className={`h-full p-2 mb-8 w-${isSidebarOpen ? "64" : "20"} bg-gray-900 shadow-lg flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex justify-center items-center py-4">
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none">
          {isSidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-grow">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center p-3 hover:bg-gray-800 rounded mb-2 ${getLinkClass(link.path)}`}
          >
            {link.icon}
            {isSidebarOpen && <span className="ml-2">{link.label}</span>}
          </Link>
        ))}
      </nav>

      

      {/* Logout Button */}
      <div className="py-4">
        <button onClick={handleLogout} className="flex items-center p-3 hover:bg-gray-800 rounded w-full text-red-500">
          <FaSignOutAlt className="h-6 w-6 mr-2" />
          {isSidebarOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default DashboardNavbar;