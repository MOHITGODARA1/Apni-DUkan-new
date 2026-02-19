import { Save, User, Bell, Lock } from "lucide-react";

const Settings = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>

            <div className="grid gap-8 max-w-4xl">
                {/* Profile Settings */}
                <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                    <div className="flex items-center gap-2 mb-6 text-blue-400">
                        <User size={24} />
                        <h2 className="text-lg font-bold text-white">Profile Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Full Name</label>
                            <input
                                type="text"
                                defaultValue="Admin User"
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Email Address</label>
                            <input
                                type="email"
                                defaultValue="admin@example.com"
                                className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                            />
                        </div>
                    </div>
                </div>

                {/* Notification Preferences */}
                <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                    <div className="flex items-center gap-2 mb-6 text-yellow-400">
                        <Bell size={24} />
                        <h2 className="text-lg font-bold text-white">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[#1f2937]/50 rounded-lg">
                            <span className="text-gray-300">Email Notifications</span>
                            <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#1f2937]/50 rounded-lg">
                            <span className="text-gray-300">Order Updates</span>
                            <div className="w-12 h-6 bg-[#3b82f6] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                    <div className="flex items-center gap-2 mb-6 text-red-400">
                        <Lock size={24} />
                        <h2 className="text-lg font-bold text-white">Security</h2>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">Last password change: 3 months ago</div>
                        <button className="px-4 py-2 bg-[#1f2937] border border-[#374151] text-white rounded-lg hover:bg-[#374151] transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-500/20">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
