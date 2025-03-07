import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [title, setTitle] = useState("Dashboard");
    console.log("setTitle", setTitle);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex min-h-screen bg-[#1A1C1B] text-white">
            <DashboardNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={`flex-1 flex flex-col p-8 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <DashboardHeader title={title} />
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;