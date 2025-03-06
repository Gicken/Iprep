import React from "react";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main style={{ height: 'calc(100vh - 64px - 128px)' }} className="flex-grow h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;