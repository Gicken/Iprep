import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../../shared/components'
import { Footer } from '../../shared/components'

const MainLayout = () => {
    return (
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-grow w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default MainLayout;
