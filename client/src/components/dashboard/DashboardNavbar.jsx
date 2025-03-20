import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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

    return (
        <aside
            className={`transition-all duration-300 ease-in-out ${
                isSidebarOpen ? "w-64 p-4" : "w-20 p-2"
            } bg-gray-900 rounded-3xl m-4 mt-0 mb-0 h-120 fixed flex flex-col justify-between`}
            style={{
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
        >
            <div className="flex justify-center items-center mb-4">
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isSidebarOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            <nav>
                <Link to="/dashboard" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    {isSidebarOpen && "Dashboard"}
                </Link>

                <Link to="/dashboard/start" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard/start")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    {isSidebarOpen && "Practice Interviews"}
                </Link>

                <Link to="/dashboard/history" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard/history")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isSidebarOpen && "Interview History"}
                </Link>

                <Link to="/dashboard/cv-manager" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard/cv-manager")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" />
                    </svg>
                    {isSidebarOpen && "CV Manager"}
                </Link>

                <Link to="/dashboard/feedback" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard/feedback")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 14H3a2 2 0 002 2h14a2 2 0 002-2z" />
                    </svg>
                    {isSidebarOpen && "Feedback"}
                </Link>

                <Link to="/dashboard/profile" className={`flex items-center p-2 hover:bg-gray-800 rounded mb-2 ${getLinkClass("/dashboard/profile")}`}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    </svg>
                    {isSidebarOpen && "Profile"}
                </Link>
            </nav>

            <div className="mt-4">
                <button onClick={handleLogout} className="flex items-center p-2 hover:bg-gray-800 rounded w-full text-red-500">
                    <svg className="h-6 w-6 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    {isSidebarOpen && "Logout"}
                </button>
            </div>
        </aside>
    );
};

export default DashboardNavbar;
