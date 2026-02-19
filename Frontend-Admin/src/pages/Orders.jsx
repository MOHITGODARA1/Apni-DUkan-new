import { useState } from "react";
import { Eye, Printer, Filter, ChevronDown, Search } from "lucide-react";

// Mock Data
const MOCK_ORDERS = [
    { id: "ORD-001", customer: "John Doe", date: "2026-02-19", items: 3, total: 2499, payment: "Paid", status: "Delivered" },
    { id: "ORD-002", customer: "Jane Smith", date: "2026-02-18", items: 1, total: 899, payment: "Pending", status: "Processing" },
    { id: "ORD-003", customer: "Robert Brown", date: "2026-02-18", items: 5, total: 12450, payment: "Paid", status: "Shipped" },
    { id: "ORD-004", customer: "Emily White", date: "2026-02-17", items: 2, total: 1500, payment: "Failed", status: "Cancelled" },
    { id: "ORD-005", customer: "Michael Green", date: "2026-02-16", items: 1, total: 450, payment: "Paid", status: "Pending" },
];

const STATUS_COLORS = {
    "Pending": "bg-yellow-500/10 text-yellow-500",
    "Processing": "bg-blue-500/10 text-blue-500",
    "Shipped": "bg-purple-500/10 text-purple-500",
    "Delivered": "bg-green-500/10 text-green-500",
    "Cancelled": "bg-red-500/10 text-red-500",
};

const Orders = () => {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = MOCK_ORDERS.filter(order => {
        const matchesFilter = filter === "All" || order.status === filter;
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">Order Management</h1>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1f2937] text-white rounded-lg hover:bg-[#374151] transition-colors">
                        <Printer size={18} />
                        Export
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-blue-600 transition-colors">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#111827] p-4 rounded-lg border border-[#1f2937] flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filter === status
                                    ? "bg-[#3b82f6] text-white"
                                    : "bg-[#1f2937] text-gray-400 hover:text-white"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1f2937] text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Items</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f2937]">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#1f2937]/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.date}</td>
                                    <td className="px-6 py-4">{order.items}</td>
                                    <td className="px-6 py-4 text-white">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${order.payment === "Paid" ? "text-green-500 bg-green-500/10" :
                                                order.payment === "Failed" ? "text-red-500 bg-red-500/10" : "text-yellow-500 bg-yellow-500/10"
                                            }`}>
                                            {order.payment}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-[#374151] rounded-lg transition-colors">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No orders found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
