import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex h-screen bg-[#0a0e1a] text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
                <Navbar onMenuClick={toggleSidebar} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0a0e1a]">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
