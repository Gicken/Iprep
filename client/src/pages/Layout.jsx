import React from "react";
import Navbar from "../components/navbar/navbar";


import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet /> {/* This is where the nested route content will render */}
      </main>
    </div>
  );
};


export default Layout;