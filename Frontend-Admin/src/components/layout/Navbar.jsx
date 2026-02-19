import { Menu, Bell, Search, User } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
    return (
        <header className="h-16 bg-[#111827] border-b border-[#1f2937] flex items-center justify-between px-4 sticky top-0 z-30 w-full">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden text-gray-400 hover:text-white">
                    <Menu size={24} />
                </button>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1f2937] rounded-md border border-[#374151]">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-white w-64 placeholder:text-gray-500 focus:ring-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative text-gray-400 hover:text-white transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-[#374151]">
                    <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <User size={18} />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-white">Admin User</p>
                        <p className="text-xs text-gray-400">Super Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
