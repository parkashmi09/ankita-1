'use client'

import { useState } from "react";


const Layout = ({ children }) => {

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col w-full">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="flex-grow overflow-y-auto bg-gray-100 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
