import {
    DollarSign,
    ShoppingCart,
    Package,
    Activity
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500 font-medium">{trend}</span>
            <span className="text-gray-500 ml-2">vs last month</span>
        </div>
    </div>
);

const Dashboard = () => {
    // Mock Data
    const revenueData = [
        { name: 'Mon', total: 4000 },
        { name: 'Tue', total: 3000 },
        { name: 'Wed', total: 5000 },
        { name: 'Thu', total: 2780 },
        { name: 'Fri', total: 1890 },
        { name: 'Sat', total: 2390 },
        { name: 'Sun', total: 3490 },
    ];

    const orderStatusData = [
        { name: 'Delivered', value: 400, color: '#10b981' }, // Green
        { name: 'Processing', value: 300, color: '#3b82f6' }, // Blue
        { name: 'Cancelled', value: 100, color: '#ef4444' }, // Red
        { name: 'Pending', value: 200, color: '#f59e0b' },   // Yellow
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value="₹54,230"
                    icon={DollarSign}
                    color="text-green-500 bg-green-500"
                    trend="+12.5%"
                />
                <StatCard
                    title="Total Orders"
                    value="1,245"
                    icon={ShoppingCart}
                    color="text-blue-500 bg-blue-500"
                    trend="+8.1%"
                />
                <StatCard
                    title="Products"
                    value="432"
                    icon={Package}
                    color="text-purple-500 bg-purple-500"
                    trend="+2.3%"
                />
                <StatCard
                    title="Active Users"
                    value="892"
                    icon={Activity}
                    color="text-orange-500 bg-orange-500"
                    trend="+5.4%"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                    <h3 className="text-lg font-bold mb-4 text-white">Weekly Revenue</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Order Status Chart */}
                <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                    <h3 className="text-lg font-bold mb-4 text-white">Order Status</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <PieChart>
                                <Pie
                                    data={orderStatusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {orderStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4 flex-wrap">
                            {orderStatusData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-sm text-gray-400">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
                <div className="p-6 border-b border-[#1f2937]">
                    <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1f2937] text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Product</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f2937]">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-[#1f2937]/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">#ORD-00{i}</td>
                                    <td className="px-6 py-4">John Doe</td>
                                    <td className="px-6 py-4">Wireless Headphones</td>
                                    <td className="px-6 py-4">Feb 19, 2026</td>
                                    <td className="px-6 py-4 text-white">₹2,499</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
