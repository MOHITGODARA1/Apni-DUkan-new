import { BarChart3, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";

// Mock Data for Dashboard
const STATS = [
    { label: "Total Purchases", value: "₹ 1,24,500", change: "+12.5%", isPositive: true, icon: DollarSign },
    { label: "Total Orders", value: "45", change: "+4", isPositive: true, icon: Package },
    { label: "Monthly Spending", value: "₹ 45,200", change: "-2.4%", isPositive: false, icon: TrendingDown },
    { label: "Savings Claimed", value: "₹ 8,400", change: "+15%", isPositive: true, icon: TrendingUp },
];

const Dashboard = () => {
    return (
        <div className="p-6 md:p-8 min-h-screen bg-[#F7F8FA]">
            <div className="max-w-[1400px] mx-auto space-y-8">
                <div className="flex items-end justify-between mt-10 md:mt-0">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1B2A4A] tracking-tight">Business Overview</h1>
                        <p className="text-gray-500 mt-1">Track your purchasing habits and savings.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STATS.map((stat, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-[#F7F8FA] rounded-xl text-[#1B2A4A] group-hover:bg-[#1B2A4A] group-hover:text-white transition-colors">
                                    <stat.icon size={22} className="text-[#E8722A]" />
                                </div>
                                <span className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                    {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.change}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-medium mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-[#1B2A4A] tracking-tight">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Mockup */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-gray-400 gap-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#F7F8FA]/50 skew-y-12 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        <div className="p-6 bg-[#F7F8FA] rounded-full">
                            <BarChart3 size={48} className="text-gray-300" />
                        </div>
                        <div className="text-center z-10">
                            <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">Analytics Coming Soon</h3>
                            <p className="max-w-xs mx-auto text-sm">We're building detailed charts to help you visualize your purchasing trends.</p>
                        </div>
                    </div>

                    {/* Side Panel / Recent Orders Mock */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col h-full">
                        <h3 className="text-lg font-bold text-[#1B2A4A] mb-4">Recent Activity</h3>
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 gap-3 border-2 border-dashed border-gray-100 rounded-xl bg-[#F7F8FA]/30 p-8">
                            <Package size={32} className="text-gray-300" />
                            <p className="text-sm">No recent activity to show.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
