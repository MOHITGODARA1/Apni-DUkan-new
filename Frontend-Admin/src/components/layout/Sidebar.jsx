import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Truck,
    Users,
    BarChart3,
    Settings,
    LogOut,
    X
} from "lucide-react";
import { cn } from "../../utils/cn";
import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: "/", label: "Dashboard", icon: LayoutDashboard },
        { path: "/products", label: "Products", icon: Package },
        { path: "/orders", label: "Orders", icon: ShoppingCart },
        { path: "/delivery", label: "Delivery", icon: Truck },
        { path: "/customers", label: "Customers", icon: Users },
        { path: "/analytics", label: "Analytics", icon: BarChart3 },
        { path: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            <div className={cn(
                "fixed top-0 left-0 z-50 h-screen w-64 bg-[#111827] border-r border-[#1f2937] transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-[#1f2937]">
                    <span className="text-xl font-bold text-white">Admin Panel</span>
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-4">
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => onClose()} // Close sidebar on mobile click
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        isActive
                                            ? "bg-[#3b82f6] text-white"
                                            : "text-gray-400 hover:bg-[#1f2937] hover:text-white"
                                    )}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 rounded-lg hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
