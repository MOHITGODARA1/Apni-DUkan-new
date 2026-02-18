import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
    // Mobile sidebar toggle state if needed (currently using bottom nav for mobile)
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg font-sans">
            <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex pt-[64px] md:pt-[64px]"> {/* Adjust padding for mobile search bar if needed in future */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main Content Area */}
                <main className="flex-1 md:ml-[260px] w-full min-h-[calc(100vh-64px)] pb-16 md:pb-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
