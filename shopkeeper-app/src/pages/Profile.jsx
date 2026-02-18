import { useState } from "react";
import { User, Store, Lock, Camera } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

const Profile = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("personal");

    return (
        <div className="p-6 md:p-8 min-h-screen bg-[#F7F8FA]">
            <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">

                {/* LEFT: Sidebar Card (4 cols) */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm sticky top-24">
                        <div className="relative w-28 h-28 mx-auto mb-6 group">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1B2A4A] to-[#2C4270] text-white flex items-center justify-center text-4xl font-bold border-[6px] border-white shadow-xl overflow-hidden">
                                {user?.name?.charAt(0) || "U"}
                            </div>
                            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full border border-gray-100 text-gray-400 hover:text-[#E8722A] shadow-md transition-all hover:scale-110 group-hover:block">
                                <Camera size={16} />
                            </button>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-[#1B2A4A] mb-1">{user?.name}</h2>
                            <span className="inline-block bg-orange/10 text-[#E8722A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Retailer</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            {[
                                { id: "personal", label: "Personal Info", icon: User },
                                { id: "business", label: "Business Info", icon: Store },
                                { id: "security", label: "Security Settings", icon: Lock },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all",
                                        activeTab === tab.id
                                            ? "bg-[#1B2A4A] text-white shadow-md shadow-navy/20"
                                            : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-[#1B2A4A]"
                                    )}
                                >
                                    <tab.icon size={18} className={activeTab === tab.id ? "text-[#E8722A]" : ""} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: Content (8 cols) */}
                <div className="md:col-span-8">
                    <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm min-h-[500px]">

                        {activeTab === "personal" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">Personal Information</h3>
                                    <p className="text-gray-500 text-sm">Update your personal details here.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Full Name</label>
                                        <Input defaultValue={user?.name} className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Email Address</label>
                                        <Input defaultValue={user?.email} disabled className="h-12 bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed" />
                                    </div>
                                    <div className="space-y-2 col-span-full">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Phone Number</label>
                                        <Input defaultValue={user?.phone || "+91 98765 43210"} className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white h-12 px-8 rounded-xl font-bold shadow-lg shadow-orange/20 transition-transform active:scale-95">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Similar updates for business and security tabs... */}
                        {activeTab === "business" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">Business Details</h3>
                                    <p className="text-gray-500 text-sm">Manage your shop information.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Shop Name</label>
                                        <Input defaultValue={user?.businessName || "My Shop"} className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Shop Address</label>
                                        <textarea
                                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8722A]/20 focus:border-[#E8722A] min-h-[120px] resize-none"
                                            defaultValue={user?.address}
                                            placeholder="Enter your shop address..."
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-[#1B2A4A]">City</label>
                                            <Input defaultValue="Jaipur" className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-[#1B2A4A]">Pincode</label>
                                            <Input defaultValue="302001" className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white h-12 px-8 rounded-xl font-bold shadow-lg shadow-orange/20 transition-transform active:scale-95">
                                        Save Business Info
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">Security Settings</h3>
                                    <p className="text-gray-500 text-sm">Update your password and security preferences.</p>
                                </div>

                                <div className="space-y-6 max-w-md">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Current Password</label>
                                        <Input type="password" placeholder="••••••••" className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">New Password</label>
                                        <Input type="password" placeholder="••••••••" className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#1B2A4A]">Confirm New Password</label>
                                        <Input type="password" placeholder="••••••••" className="h-12 border-gray-200 focus:border-[#E8722A] focus:ring-[#E8722A]" />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white h-12 px-8 rounded-xl font-bold shadow-lg shadow-orange/20 transition-transform active:scale-95">
                                        Update Password
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
