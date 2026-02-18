import { Link, useNavigate } from "react-router-dom";
import { Store, Search, ShoppingCart, Bell, MapPin, User, LogOut, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { Button } from "../ui/Button";

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 transition-all duration-300">
            <div className="flex h-full">

                {/* Left: Logo (Matches Sidebar Width on Desktop) */}
                <div className="md:w-[260px] w-full md:border-r border-gray-100 flex items-center justify-between md:justify-start px-4 md:px-6 shrink-0 bg-white/50">
                    <Link to="/home" className="flex items-center gap-2.5 group">
                        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B2A4A] to-[#2A3B5E] text-white shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                            <Store className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold text-[#1B2A4A] tracking-tight group-hover:text-orange transition-colors">Apni Dukan</span>
                    </Link>
                    {/* Mobile Toggle would go here if needed, but assuming bottom nav for now */}
                </div>

                {/* Right: Content (Matches Main Content Area) */}
                <div className="hidden md:flex flex-1 items-center justify-between px-6 bg-white/50">

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search products, brands, or categories..."
                                className="w-full h-11 pl-11 pr-4 rounded-xl border-none bg-gray-50 text-sm font-medium text-[#1B2A4A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#E8722A]/20 focus:bg-white transition-all duration-200 shadow-sm group-hover:bg-white group-hover:shadow-md"
                            />
                            <Search className="absolute left-4 top-3 w-4 h-4 text-gray-400 group-hover:text-[#E8722A] transition-colors" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Location Pill */}
                        <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:border-gray-200 hover:bg-white transition-all cursor-pointer">
                            <MapPin className="w-3.5 h-3.5 text-[#E8722A]" />
                            <span>Delivering to: <span className="text-[#1B2A4A]">New Delhi</span></span>
                        </div>

                        <div className="h-6 w-px bg-gray-200 mx-1 hidden lg:block"></div>

                        {/* Icons */}
                        <Link to="/wishlist" className="relative p-2.5 text-gray-400 hover:text-[#E8722A] hover:bg-[#E8722A]/5 rounded-xl transition-all duration-200 group">
                            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>

                        <Link to="/cart" className="relative p-2.5 text-gray-400 hover:text-[#E8722A] hover:bg-[#E8722A]/5 rounded-xl transition-all duration-200 group">
                            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {cartCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-bold text-white bg-[#E8722A] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button className="relative p-2.5 text-gray-400 hover:text-[#E8722A] hover:bg-[#E8722A]/5 rounded-xl transition-all duration-200 group">
                            <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2.5 pl-1.5 pr-2 py-1 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8722A] to-[#D4651F] flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                                    {user?.name?.charAt(0) || "U"}
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-xs font-bold text-[#1B2A4A] leading-tight max-w-[80px] truncate">{user?.name || "User"}</p>
                                    <p className="text-[10px] font-medium text-gray-400">Retailer</p>
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 z-50">
                                    <div className="px-5 py-3 border-b border-gray-50 mb-1">
                                        <p className="text-sm font-bold text-[#1B2A4A]">{user?.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                    <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                        <User className="w-4 h-4" /> Profile
                                    </Link>
                                    <Link to="/orders" className="flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-[#1B2A4A] hover:bg-gray-50 transition-colors" onClick={() => setIsDropdownOpen(false)}>
                                        <ShoppingCart className="w-4 h-4" /> My Orders
                                    </Link>
                                    <div className="my-1 border-t border-gray-50"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 text-left transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar (Below navbar) */}
            <div className="md:hidden px-4 pb-3 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full h-10 pl-10 pr-4 rounded-xl border-none bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-[#E8722A]/20"
                    />
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
