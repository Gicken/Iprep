import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../shared/components/dashboard/DashboardNavbar";
import DashboardHeader from "../shared/components/dashboard/DashboardHeader";
import { Footer, Navbar } from "../shared/components";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [title, setTitle] = useState("Page");
    console.log("setTitle", setTitle);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div>
        <Navbar/>
        <div className="flex bg-[#1A1C1B] text-white">
            <DashboardNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={`flex-1 flex flex-col p-8 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <DashboardHeader title={title} />
                <Outlet context={{setTitle}} />
            </main>
        </div>
        <Footer/>
        </div>
    );
};

export default DashboardLayout;