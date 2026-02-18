import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Package, ChevronRight, Filter, Clock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/orders/my");
            setOrders(res.data.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            setLoading(false);
        }
    };

    const filteredOrders = activeTab === "All"
        ? orders
        : orders.filter(o => o.status === activeTab);

    if (loading) {
        return (
            <div className="p-6 md:p-8 min-h-screen bg-[#F7F8FA]">
                <div className="max-w-[1000px] mx-auto space-y-6 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-md w-48 mb-6"></div>
                    <div className="flex gap-4 mb-6">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-gray-200 rounded-full w-24"></div>)}
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 rounded-2xl border border-gray-200"></div>)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 min-h-screen bg-[#F7F8FA]">
            <div className="max-w-[1000px] mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-1">My Orders</h1>
                        <p className="text-gray-500">Track and manage your order history</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Filter by ID..."
                                className="pl-9 pr-4 h-10 rounded-xl border-gray-200 text-sm focus:border-[#E8722A] focus:ring-[#E8722A] w-full md:w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto pb-1 scrollbar-hide border-b border-gray-100 gap-8">
                    {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 px-1",
                                activeTab === tab
                                    ? "border-[#E8722A] text-[#1B2A4A]"
                                    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
                            )}
                        >
                            {tab}
                            <span className={cn(
                                "ml-2 text-xs py-0.5 px-2 rounded-full",
                                activeTab === tab ? "bg-[#E8722A]/10 text-[#E8722A]" : "bg-gray-100 text-gray-500"
                            )}>
                                {tab === "All" ? orders.length : orders.filter(o => o.status === tab).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {filteredOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">No orders found</h3>
                            <p className="text-gray-500 max-w-xs">{activeTab === "All" ? "You haven't placed any orders yet." : `No orders found with status "${activeTab}".`}</p>
                            {activeTab === "All" && (
                                <Link to="/products" className="mt-6">
                                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white">Start Shopping</Button>
                                </Link>
                            )}
                        </div>
                    ) : (
                        filteredOrders.map(order => (
                            <div key={order._id} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all group">
                                {/* Header */}
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6 pb-4 border-b border-gray-100 border-dashed">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-[#1B2A4A] text-lg">Order #{order._id.slice(-6).toUpperCase()}</span>
                                            <div className={cn("px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5", statusColors[order.status])}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                {order.status}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-400 flex items-center gap-2">
                                            <Clock size={14} />
                                            Placed on {new Date(order.date || order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-[#1B2A4A]">₹{order.total.toLocaleString()}</p>
                                        <p className="text-sm text-gray-400">{order.items.length} Items</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {/* Images */}
                                    <div className="flex items-center gap-2 overflow-hidden flex-1 w-full relative mask-linear-fade">
                                        {order.images?.slice(0, 5).map((img, idx) => (
                                            <div key={idx} className="w-16 h-16 rounded-xl border border-gray-100 bg-[#F7F8FA] flex items-center justify-center shrink-0 p-1">
                                                <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                        ))}
                                        {order.images?.length > 5 && (
                                            <div className="w-16 h-16 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 text-sm font-bold text-gray-500">
                                                +{order.images.length - 5}
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                                        {order.status === "Delivered" && (
                                            <Button variant="outline" className="h-10 px-4 text-sm font-bold text-[#1B2A4A] border-gray-200 hover:bg-gray-50 hover:text-[#E8722A] hover:border-[#E8722A]/30">
                                                Download Invoice
                                            </Button>
                                        )}
                                        <Link to={`/orders/${order._id}`} className="flex-1 md:flex-none">
                                            <Button className="w-full h-10 px-6 text-sm font-bold bg-white border border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white transition-all shadow-sm">
                                                View Details
                                                <ChevronRight size={16} className="ml-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Orders;
