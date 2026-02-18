import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "../components/ui/Button";
import QuantitySelector from "../components/ui/QuantitySelector";
import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cartItems, updateQty, removeFromCart, cartTotal, loading } = useCart();
    const navigate = useNavigate();

    // Mock delivery date
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDate = deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center animate-pulse">
                    <Trash2 size={48} className="text-gray-300" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">Your Cart is Empty</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Browse our products to find the best deals.</p>
                </div>
                <Link to="/products">
                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white px-8 h-12 text-base font-bold rounded-xl shadow-md transition-transform hover:scale-105">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto min-h-screen p-6 md:p-8">
            {/* LEFT: Cart Items (70%) */}
            <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-[#1B2A4A]">Shopping Cart <span className="text-gray-400 font-medium text-lg ml-2">({cartItems.length} items)</span></h1>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-gray-50/50 p-4 flex items-center gap-3 border-b border-gray-100">
                        <input type="checkbox" className="rounded-md border-gray-300 text-[#E8722A] focus:ring-[#E8722A]" />
                        <span className="text-sm font-bold text-[#1B2A4A]">Select All Items</span>
                    </div>

                    {/* Cart Item Loop */}
                    <div className="divide-y divide-gray-100">
                        {cartItems.map((item) => (
                            <div key={item._id} className="p-6 flex flex-col sm:flex-row gap-6 group transition-colors hover:bg-gray-50/30">
                                {/* Image */}
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#F7F8FA] rounded-xl overflow-hidden shrink-0 border border-gray-100 p-2">
                                    <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.brand}</p>
                                            <h3 className="font-bold text-[#1B2A4A] text-lg leading-snug line-clamp-2 hover:text-[#E8722A] transition-colors cursor-pointer">{item.name}</h3>
                                            <p className="text-xs text-gray-400 mt-1">SKU: {item.sku || "AD-00X"}</p>
                                        </div>
                                        <p className="font-bold text-[#1B2A4A] text-xl">₹{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-green-700 font-medium bg-green-50 w-fit px-2 py-1 rounded-md mb-4">
                                        <Truck size={14} />
                                        <span>Delivers by {formattedDate}</span>
                                    </div>

                                    {/* Actions Row */}
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 border border-gray-200 rounded-lg flex items-center bg-white">
                                                <button
                                                    onClick={() => updateQty(item._id, Math.max(item.moq || 1, item.quantity - 1))}
                                                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] transition-colors"
                                                >-</button>
                                                <span className="w-10 text-center font-bold text-[#1B2A4A] text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQty(item._id, Math.min(item.stock, item.quantity + 1))}
                                                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] transition-colors"
                                                >+</button>
                                            </div>
                                            <span className="text-xs text-gray-400">Min: {item.moq || 1}</span>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm font-medium">
                                            <button className="text-gray-400 hover:text-[#1B2A4A] transition-colors decoration-gray-300 hover:underline">
                                                Save for Later
                                            </button>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-gray-400 hover:text-red-600 flex items-center gap-1.5 transition-colors group/trash"
                                            >
                                                <Trash2 size={16} className="group-hover/trash:scale-110 transition-transform" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: Summary (30%) */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
                    <h2 className="text-lg font-bold text-[#1B2A4A] mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                    <div className="space-y-3 text-sm text-gray-600 pb-6 border-b border-gray-100 border-dashed">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Items Total ({cartItems.length})</span>
                            <span className="font-medium text-[#1B2A4A]">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600 bg-green-50 p-2 rounded-lg">
                            <span className="font-medium">Bulk Discount</span>
                            <span>- ₹0</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">Delivery Charges</span>
                            <span className="text-green-600 font-bold text-xs uppercase bg-green-100 px-2 py-0.5 rounded">Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-end py-4 mb-2">
                        <div>
                            <span className="text-base text-[#1B2A4A] font-medium block">Total Payable</span>
                            <span className="text-xs text-gray-400">Incl. of all taxes</span>
                        </div>
                        <span className="text-2xl font-bold text-[#1B2A4A]">₹{cartTotal.toLocaleString()}</span>
                    </div>

                    <Button onClick={() => navigate("/checkout")} className="w-full bg-[#E8722A] hover:bg-[#D4651F] text-white h-14 text-base font-bold rounded-xl shadow-lg shadow-orange/20 transition-all hover:scale-[1.02] active:scale-95">
                        Proceed to Checkout
                        <ArrowRight size={18} className="ml-2" />
                    </Button>

                    <div className="pt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <ShieldCheck size={14} className="text-green-600" />
                        <span>Safe and Secure Payments via Razorpay</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
