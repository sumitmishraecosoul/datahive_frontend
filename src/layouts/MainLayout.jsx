import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed z-40 md:static transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Ecosoul</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
