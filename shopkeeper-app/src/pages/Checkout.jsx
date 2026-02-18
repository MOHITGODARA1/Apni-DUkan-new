import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, MapPin, CreditCard, Truck, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirm
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [orderId, setOrderId] = useState(null);

    // Mock confirm order
    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderPayload = {
                items: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: user?.address || "123 Market St", // Using user address as fallback string for now if object not available
                paymentMethod: paymentMethod,
                totalPrice: cartTotal
            };

            const res = await axios.post("/orders", orderPayload);
            setOrderId(res.data.data._id);
            setStep(3);
            clearCart();
        } catch (error) {
            console.error("Order placement failed", error);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && step !== 3) {
        navigate("/cart");
        return null;
    }

    // SUCCESS STEP (3)
    if (step === 3) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 max-w-lg mx-auto">
                <div className="relative">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <div className="absolute -inset-4 bg-green-50 rounded-full -z-10 animate-pulse"></div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2A4A] mb-2">Order Placed Successfully! 🎉</h1>
                    <p className="text-gray-500 text-lg">
                        Thank you for your order. Your Order ID is <span className="font-bold text-[#1B2A4A]">#{orderId ? orderId.slice(-6).toUpperCase() : 'N/A'}</span>.
                        <br />We have sent a confirmation email to you.
                    </p>
                </div>
                <div className="flex gap-4 w-full">
                    <Link to="/orders" className="flex-1">
                        <Button className="w-full bg-white border border-gray-200 text-[#1B2A4A] hover:bg-gray-50 h-12 rounded-xl font-bold">Track Order</Button>
                    </Link>
                    <Link to="/home" className="flex-1">
                        <Button className="w-full bg-[#E8722A] hover:bg-[#D4651F] text-white h-12 rounded-xl font-bold shadow-lg shadow-orange/20">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">

            {/* LEFT COLUMN: Steps */}
            <div className="lg:col-span-8 space-y-6">

                {/* STEP 1: Address */}
                <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${step === 1 ? "border-[#E8722A] shadow-md ring-1 ring-[#E8722A]/20" : "border-gray-200 opacity-60"}`}>
                    <div className="p-5 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? "bg-[#E8722A] text-white" : "bg-gray-200 text-gray-500"}`}>1</div>
                        <h2 className="text-lg font-bold text-[#1B2A4A]">Delivery Address</h2>
                        {step > 1 && <Button variant="ghost" onClick={() => setStep(1)} className="ml-auto text-xs font-bold text-[#E8722A] hover:bg-[#E8722A]/10">CHANGE</Button>}
                    </div>

                    {step === 1 && (
                        <div className="p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Saved Address Card */}
                                <div className="border-2 border-[#E8722A] bg-[#E8722A]/5 rounded-xl p-5 relative cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                                    <div className="absolute top-4 right-4 text-[#E8722A]">
                                        <CheckCircle size={22} fill="currentColor" className="text-white" />
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="font-bold text-[#1B2A4A] mb-1">Ramesh General Store</h3>
                                        <span className="bg-[#1B2A4A] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">WORK</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1 leading-relaxed">123, Market Road, Near City Center,<br />Jaipur, Rajasthan - 302001</p>
                                    <p className="text-sm text-[#1B2A4A] font-bold">Phone: 9876543210</p>
                                    <Button className="w-full mt-5 bg-[#E8722A] text-white h-10 rounded-lg font-bold shadow-sm hover:bg-[#D4651F]" onClick={() => setStep(2)}>Deliver Here</Button>
                                </div>

                                {/* Add New Address Placeholder */}
                                <div className="border-2 border-gray-100 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all min-h-[220px] group">
                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                                        <MapPin size={24} />
                                    </div>
                                    <span className="text-sm font-bold group-hover:text-[#1B2A4A] transition-colors">+ Add New Address</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* STEP 2: Payment */}
                <div className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${step === 2 ? "border-[#E8722A] shadow-md ring-1 ring-[#E8722A]/20" : "border-gray-200 opacity-60"}`}>
                    <div className="p-5 bg-gray-50/50 border-b border-gray-100 flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? "bg-[#E8722A] text-white" : "bg-gray-200 text-gray-500"}`}>2</div>
                        <h2 className="text-lg font-bold text-[#1B2A4A]">Payment Method</h2>
                    </div>

                    {step === 2 && (
                        <div className="p-8 space-y-4 animate-in slide-in-from-top-4 duration-300">
                            {["UPI (Google Pay, PhonePe, Paytm)", "Credit / Debit Card", "Net Banking", "Cash on Delivery"].map((method, idx) => (
                                <label key={idx} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method ? "border-[#E8722A] bg-[#E8722A]/5 shadow-sm" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}>
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === method ? "border-[#E8722A]" : "border-gray-300"}`}>
                                        {paymentMethod === method && <div className="w-2.5 h-2.5 bg-[#E8722A] rounded-full" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === method}
                                        onChange={() => setPaymentMethod(method)}
                                        className="hidden"
                                    />
                                    <span className={`font-medium ${paymentMethod === method ? "text-[#1B2A4A]" : "text-gray-600"}`}>{method}</span>
                                </label>
                            ))}

                            <Button onClick={handlePlaceOrder} disabled={loading} className="w-full bg-[#E8722A] hover:bg-[#D4651F] text-white h-14 text-lg font-bold rounded-xl shadow-lg shadow-orange/20 mt-6 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70">
                                {loading ? "Processing..." : `Place Order • ₹${cartTotal.toLocaleString()}`}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT COLUMN: Summary */}
            <div className="lg:col-span-4 space-y-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
                    <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto scrollbar-thin pr-2">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex gap-4 text-sm group">
                                <div className="w-14 h-14 rounded-lg bg-[#F7F8FA] border border-gray-100 flex items-center justify-center p-1 shrink-0">
                                    <img src={item.images[0]} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-[#1B2A4A] line-clamp-2 leading-snug group-hover:text-[#E8722A] transition-colors">{item.name}</p>
                                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-[#1B2A4A] whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Items Total</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Delivery</span>
                            <span className="bg-green-100 px-2 py-0.5 rounded textxs font-bold uppercase">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl text-[#1B2A4A] pt-4 border-t border-dashed border-gray-200 mt-2">
                            <span>Total Payable</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
