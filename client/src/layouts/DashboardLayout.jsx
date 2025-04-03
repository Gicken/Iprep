import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../features/dashboard/components/DashboardNavbar";
import DashboardHeader from "../shared/components/dashboard/DashboardHeader";
import { Footer, Navbar } from "../shared/components";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [title, setTitle] = useState("Page");
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="flex flex-col h-screen">
        <Navbar/>
        <div className="flex flex-1">
          {/* Sidebar */}
          <DashboardNavbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  
          {/* Main Content */}
          <main className={`flex-1 flex flex-col p-8 transition-all duration-300 ${isSidebarOpen ? "ml-4" : "ml-4"}`}>
            <DashboardHeader title={title} />
            <Outlet context={{ setTitle }} />
          </main>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default DashboardLayout;