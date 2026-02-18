import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, CheckCircle, Clock, Package, Truck, Download, AlertCircle, MapPin, CreditCard } from "lucide-react";
import { Button } from "../components/ui/Button";
import { cn } from "../lib/utils";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`/orders/${id}`);
                setOrder(res.data.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch order details");
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    if (loading) return (
        <div className="max-w-[1000px] mx-auto p-8 text-center space-y-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
            <div className="h-64 bg-gray-100 rounded-2xl w-full"></div>
        </div>
    );

    if (error) return (
        <div className="max-w-[1000px] mx-auto p-12 text-center rounded-2xl border border-red-100 bg-red-50/50">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading Order</h3>
            <p className="text-red-700">{error}</p>
        </div>
    );

    if (!order) return <div className="p-10 text-center">Order not found</div>;

    // Map backend status to steps
    const getSteps = (status, date) => {
        const steps = [
            { label: "Order Placed", date: new Date(date), icon: Package },
            { label: "Processing", date: null, icon: Clock },
            { label: "Shipped", date: null, icon: Truck },
            { label: "Delivered", date: null, icon: CheckCircle },
        ];

        // Logic to mark completed/current steps based on status
        let currentIdx = -1;
        if (status === "Pending") currentIdx = 0;
        else if (status === "Processing") currentIdx = 1;
        else if (status === "Shipped") currentIdx = 2;
        else if (status === "Delivered") currentIdx = 3;

        return steps.map((s, i) => ({
            ...s,
            status: i < currentIdx ? "completed" : i === currentIdx ? "current" : "upcoming"
        }));
    };

    // Simplified step logic for demo purposes as real dates aren't in mock
    const steps = getSteps(order.status, order.createdAt);

    return (
        <div className="p-6 md:p-8 min-h-screen bg-[#F7F8FA]">
            <div className="max-w-[1000px] mx-auto space-y-8">
                {/* Header / Nav */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Link to="/orders" className="group flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#1B2A4A] transition-colors mb-3 w-fit">
                            <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-[#1B2A4A] transition-colors">
                                <ArrowLeft size={12} />
                            </div>
                            Back to Orders
                        </Link>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-[#1B2A4A]">
                                Order #{order._id.slice(-6).toUpperCase()}
                            </h1>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                order.status === "Delivered" ? "bg-green-100 text-green-700" :
                                    order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                        "bg-blue-100 text-blue-700"
                            )}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                            <Clock size={14} />
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 border-gray-200 text-[#1B2A4A] hover:bg-gray-50 hover:text-[#E8722A] hover:border-[#E8722A]/30 font-bold gap-2">
                            <Download size={16} /> Invoice
                        </Button>
                        {order.status === "Delivered" && (
                            <Button className="h-10 bg-[#E8722A] hover:bg-[#D4651F] text-white font-bold shadow-lg shadow-orange/20">
                                Reorder Items
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT: Items & Info (2 cols) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Tracker (Visual) */}
                        {order.status !== "Cancelled" && (
                            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                                <h3 className="font-bold text-[#1B2A4A] mb-8 flex items-center gap-2">
                                    <Truck size={18} className="text-[#E8722A]" />
                                    Order Status
                                </h3>
                                <div className="relative flex justify-between">
                                    {/* Connecting Line */}
                                    <div className="absolute top-[14px] left-0 w-full h-1 bg-gray-100 -z-10 rounded-full">
                                        <div
                                            className="h-full bg-[#E8722A] rounded-full transition-all duration-1000"
                                            style={{ width: `${(steps.findIndex(s => s.status === "current" || s.status === "upcoming") / (steps.length - 1)) * 100}%` }}
                                        ></div>
                                    </div>

                                    {steps.map((step, idx) => {
                                        const Icon = step.icon;
                                        const isActive = step.status === "completed" || step.status === "current";
                                        return (
                                            <div key={idx} className="flex flex-col items-center gap-3">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10",
                                                    isActive ? "bg-[#E8722A] border-white shadow-md scale-110" : "bg-gray-200 border-white text-gray-400"
                                                )}>
                                                    {step.status === "completed" ? <CheckCircle size={14} className="text-white" /> : <Icon size={14} className={isActive ? "text-white" : ""} />}
                                                </div>
                                                <div className="text-center">
                                                    <p className={cn("text-xs font-bold uppercase tracking-wider mb-1", isActive ? "text-[#1B2A4A]" : "text-gray-400")}>{step.label}</p>
                                                    {step.date && <p className="text-[10px] text-gray-400 font-medium">{step.date.toLocaleDateString()}</p>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Items */}
                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h2 className="font-bold text-[#1B2A4A]">Order Items <span className="text-gray-400 ml-1">({order.items.length})</span></h2>
                                <span className="text-xs font-bold text-[#E8722A] bg-orange/10 px-2 py-1 rounded">Verified Purchase</span>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {order.items.map((item, i) => (
                                    <div key={i} className="p-6 flex gap-6 hover:bg-gray-50/30 transition-colors group">
                                        <div className="w-20 h-20 bg-[#F7F8FA] rounded-xl border border-gray-100 shrink-0 p-2">
                                            <img src={item.product?.images?.[0] || "https://placehold.co/100"} className="w-full h-full object-contain mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-[#1B2A4A] text-base mb-1 group-hover:text-[#E8722A] transition-colors line-clamp-2">{item.product?.name || "Product Name"}</p>
                                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Variant: Default</p>
                                                </div>
                                                <p className="font-bold text-[#1B2A4A] text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                    <span>Qty: {item.quantity}</span>
                                                    <span className="text-gray-300">|</span>
                                                    <span>₹{item.price.toLocaleString()} / unit</span>
                                                </div>
                                                {order.status === "Delivered" && (
                                                    <button className="text-xs font-bold text-[#E8722A] hover:underline">Write a Review</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT: Info (1 col) */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Summary */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-[#1B2A4A] mb-4 pb-4 border-b border-gray-100">Order Summary</h3>
                            <div className="space-y-3 text-sm text-gray-600 pb-4 border-b border-gray-100 border-dashed mb-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[#1B2A4A]">₹{order.totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="text-gray-400">₹0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="font-bold text-[#1B2A4A] text-lg">Total</span>
                                <span className="font-bold text-[#1B2A4A] text-2xl">₹{order.totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Address & Payment */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <MapPin size={12} /> Shipping Address
                                </h3>
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-sm font-bold text-[#1B2A4A] mb-1">{order.shippingAddress.address}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <CreditCard size={12} /> Payment Method
                                </h3>
                                <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#1B2A4A]">{order.paymentMethod}</span>
                                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">PAID</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#E8722A]/5 border border-[#E8722A]/20 rounded-2xl p-5 text-center">
                            <h4 className="font-bold text-[#E8722A] text-sm mb-1">Need Help?</h4>
                            <p className="text-xs text-gray-500 mb-3">Questions about this order?</p>
                            <Button variant="outline" className="w-full h-9 text-xs border-[#E8722A] text-[#E8722A] hover:bg-[#E8722A] hover:text-white">Contact Support</Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
