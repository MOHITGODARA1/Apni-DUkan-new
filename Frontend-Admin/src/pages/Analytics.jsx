import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

const Analytics = () => {
    const data = [
        { name: 'Jan', sales: 4000, visitors: 2400 },
        { name: 'Feb', sales: 3000, visitors: 1398 },
        { name: 'Mar', sales: 5000, visitors: 3800 },
        { name: 'Apr', sales: 2780, visitors: 3908 },
        { name: 'May', sales: 1890, visitors: 4800 },
        { name: 'Jun', sales: 2390, visitors: 3800 },
        { name: 'Jul', sales: 3490, visitors: 4300 },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Analytics & Reports</h1>

            {/* Sales Trend */}
            <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                <h3 className="text-lg font-bold mb-4 text-white">Sales Overview</h3>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Comparison Chart */}
            <div className="bg-[#111827] p-6 rounded-lg border border-[#1f2937]">
                <h3 className="text-lg font-bold mb-4 text-white">Visitor Traffic vs Sales</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} />
                            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
