import { Link, useLocation } from "react-router-dom";
import {
    Home,
    Package,
    ShoppingBag,
    Heart,
    BarChart2,
    Store,
    CreditCard,
    User,
    Bell,
    LogOut,
    LayoutDashboard,
    FileText,
    Settings,
    HelpCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../lib/utils";

const Sidebar = ({ isOpen, onClose }) => {
    const { pathname } = useLocation();
    const { logout, user } = useAuth();

    const isActive = (path) => pathname === path;

    // Navigation Links Data
    const sections = [
        {
            title: "SHOP",
            items: [
                { icon: Home, label: "Home", path: "/home" },
                { icon: ShoppingBag, label: "Browse Products", path: "/products" },
                { icon: Package, label: "My Orders", path: "/orders" },
                { icon: Heart, label: "Wishlist", path: "/wishlist" },
            ]
        },
        {
            title: "MANAGE",
            items: [
                { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
                { icon: FileText, label: "Invoices", path: "/reports" },
            ]
        },
        {
            title: "ACCOUNT",
            items: [
                { icon: User, label: "Profile", path: "/profile" },
                { icon: Settings, label: "Settings", path: "/settings" },
                { icon: HelpCircle, label: "Help & Support", path: "/support" },
            ]
        }
    ];

    return (
        <>
            <aside className={`
        fixed left-0 top-0 pt-20 h-screen w-[260px] bg-white border-r border-gray-100/80 
        overflow-y-auto hidden md:flex flex-col z-40 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]
      `}>
                <div className="flex-1 px-4 space-y-8 mt-2">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                {section.title}
                            </h3>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                            isActive(item.path)
                                                ? "bg-[#E8722A]/10 text-[#E8722A]"
                                                : "text-gray-500 hover:bg-gray-50 hover:text-[#1B2A4A]"
                                        )}
                                    >
                                        {isActive(item.path) && (
                                            <div className="absolute left-0 top-0 h-full w-1 bg-[#E8722A] rounded-r-md" />
                                        )}
                                        <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive(item.path) ? "text-[#E8722A]" : "text-gray-400 group-hover:text-[#1B2A4A]")} />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Log Out Item */}
                    <div className="pt-4 border-t border-gray-100">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
                        >
                            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Bottom Card */}
                <div className="p-4 mt-auto">
                    <div className="bg-[#1B2A4A] rounded-2xl p-4 flex items-center gap-3 shadow-lg shadow-[#1B2A4A]/20 text-white">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-sm shrink-0 backdrop-blur-sm border border-white/10">
                            {user?.businessName?.charAt(0) || "S"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.businessName || "My Shop"}</p>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E8722A] text-white">
                                Pro Plan
                            </span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-border h-16 z-50 flex items-center justify-around px-2">
                {[
                    { icon: Home, label: "Home", path: "/home" },
                    { icon: Package, label: "Orders", path: "/orders" },
                    { icon: ShoppingBag, label: "Cart", path: "/cart" }, // Use CartContext count if possible
                    { icon: BarChart2, label: "Stats", path: "/dashboard" },
                    { icon: User, label: "Profile", path: "/profile" },
                ].map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-full gap-1",
                            isActive(item.path) ? "text-orange" : "text-text-muted"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Sidebar;
