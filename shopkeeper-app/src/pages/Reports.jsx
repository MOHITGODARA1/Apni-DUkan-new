import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Calendar as CalendarIcon } from "lucide-react";

const Reports = () => {
    const salesData = [
        { name: "Mon", sales: 4000, orders: 24 },
        { name: "Tue", sales: 3000, orders: 13 },
        { name: "Wed", sales: 2000, orders: 98 },
        { name: "Thu", sales: 2780, orders: 39 },
        { name: "Fri", sales: 1890, orders: 48 },
        { name: "Sat", sales: 2390, orders: 38 },
        { name: "Sun", sales: 3490, orders: 43 },
    ];

    const topProducts = [
        { name: "Headphones", sales: 120 },
        { name: "Mouse", sales: 98 },
        { name: "Keyboard", sales: 86 },
        { name: "Monitor", sales: 54 },
        { name: "Chair", sales: 45 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-navy">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500">Insights into your business performance</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" /> Last 7 Days
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue vs Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#1a1a2e" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topProducts} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={80} />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#1a1a2e" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
