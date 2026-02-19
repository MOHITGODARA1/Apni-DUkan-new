import { Search, Mail, Phone, Ban } from "lucide-react";

const MOCK_CUSTOMERS = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", orders: 12, spent: 15400, status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+91 98765 43211", orders: 5, spent: 4500, status: "Active" },
    { id: 3, name: "Robert Brown", email: "robert@example.com", phone: "+91 98765 43212", orders: 1, spent: 899, status: "Blocked" },
];

const Customers = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Customer Management</h1>

            {/* Search */}
            <div className="bg-[#111827] p-4 rounded-lg border border-[#1f2937]">
                <div className="relative max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1f2937] text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Total Spent</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f2937]">
                            {MOCK_CUSTOMERS.map((customer) => (
                                <tr key={customer.id} className="hover:bg-[#1f2937]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{customer.name}</p>
                                                <p className="text-xs text-gray-500">Joined: Jan 2024</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 space-y-1">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Mail size={12} /> {customer.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <Phone size={12} /> {customer.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{customer.orders}</td>
                                    <td className="px-6 py-4 text-white">₹{customer.spent.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${customer.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Block Customer">
                                            <Ban size={16} />
                                        </button>
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

export default Customers;
