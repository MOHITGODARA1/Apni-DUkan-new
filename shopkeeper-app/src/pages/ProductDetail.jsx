import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Star, Truck, ShieldCheck, Heart, Share2, Info } from "lucide-react";
import { Button } from "../components/ui/Button";
import QuantitySelector from "../components/ui/QuantitySelector";
import StarRating from "../components/ui/StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { cn } from "../lib/utils";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    const [selectedImage, setSelectedImage] = useState(0);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("desc");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/products/${id}`);
                setProduct(res.data.data);
                setQty(res.data.data.moq || 1);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch product details");
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading product...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
    if (!product) return <div className="p-10 text-center">Product not found</div>;

    // Calculate current price based on quantity (Mock logic as backend might not have bulkPricing yet)
    // Assuming backend product model has basic fields. We might need to adjust if bulkPricing is missing.
    const currentPrice = product.price; // Simplify for now as backend model wasn't fully inspected for bulkPricing
    const totalPrice = currentPrice * qty;

    // Mock bulk pricing for UI if not present
    const bulkPricing = product.bulkPricing || [
        { min: product.moq || 1, max: null, price: product.price, savings: 0 }
    ];

    const currentTier = bulkPricing.find(t => qty >= t.min && (t.max === null || qty <= t.max)) || bulkPricing[0];


    return (
        <div className="max-w-[1200px] mx-auto space-y-8">
            {/* Breadcrumb */}
            <div className="text-sm font-medium text-gray-500">
                Home <span className="mx-2 text-gray-300">/</span> Products <span className="mx-2 text-gray-300">/</span> <span className="text-[#1B2A4A]">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* LEFT: Gallery (6 cols) */}
                <div className="lg:col-span-6 space-y-4">
                    <div className="aspect-square bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-8 overflow-hidden relative group shadow-sm">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                        <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-all hover:scale-110">
                            <Heart size={20} />
                        </button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={cn(
                                    "w-20 h-20 shrink-0 border-2 rounded-xl p-2 bg-white transition-all overflow-hidden",
                                    selectedImage === idx ? "border-[#E8722A]" : "border-transparent hover:border-gray-200"
                                )}
                            >
                                <img src={img} alt="" className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Info (6 cols) */}
                <div className="lg:col-span-6 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            {product.tags?.includes("deal") && (
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-[#E8722A] px-2.5 py-1 rounded-full shadow-sm">Deal</span>
                            )}
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">SKU: {product.sku || "N/A"}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] leading-tight mb-3">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-2">
                                <StarRating rating={product.rating} count={product.reviewCount} size={18} />
                                <span className="text-sm font-medium text-gray-500 underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-[#1B2A4A] transition-colors">{product.reviewCount} Reviews</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200"></div>
                            <div className="text-sm text-gray-500">
                                Brand: <span className="font-bold text-[#1B2A4A]">{product.brand}</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Block */}
                    <div className="space-y-6">
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-bold text-[#1B2A4A]">₹{currentPrice.toLocaleString()}</span>
                            <span className="text-lg text-gray-400 font-medium mb-1">/ unit</span>
                            {product.mrp && product.mrp > currentPrice && (
                                <div className="flex flex-col mb-1 ml-2">
                                    <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                                        Save {Math.round(((product.mrp - currentPrice) / product.mrp) * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Interactive Bulk Tier Visualizer */}
                        <div className="bg-[#F7F8FA] rounded-2xl p-5 border border-gray-100/50">
                            <div className="flex items-center gap-2 mb-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bulk Savings</h3>
                                <Info size={14} className="text-gray-400" />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {bulkPricing.map((tier, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex-1 min-w-[100px] border rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all cursor-default",
                                            currentTier === tier
                                                ? "bg-white border-[#E8722A] shadow-md scale-105 z-10"
                                                : "bg-white border-transparent opacity-60 grayscale"
                                        )}
                                    >
                                        <span className="text-xs font-medium text-gray-500 mb-1">{tier.min}{tier.max ? `-${tier.max}` : "+"} units</span>
                                        <span className={cn("text-sm font-bold", currentTier === tier ? "text-[#E8722A]" : "text-gray-700")}>₹{tier.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Block */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <div className="h-14 bg-white border border-gray-200 rounded-xl flex items-center px-2 w-full sm:w-auto shadow-sm">
                                <button
                                    onClick={() => setQty(Math.max(product.moq || 1, qty - 1))}
                                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] transition-colors font-bold text-lg"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={qty}
                                    onChange={(e) => setQty(Math.max(product.moq || 1, parseInt(e.target.value) || 1))}
                                    className="w-16 h-full text-center font-bold text-[#1B2A4A] border-none bg-transparent focus:ring-0"
                                />
                                <button
                                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] transition-colors font-bold text-lg"
                                >
                                    +
                                </button>
                            </div>

                            <Button
                                onClick={() => addToCart(product, qty)}
                                className="flex-1 bg-[#E8722A] hover:bg-[#D4651F] text-white h-14 text-base font-bold rounded-xl shadow-lg shadow-orange/20 transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Add to Cart • ₹{totalPrice.toLocaleString()}
                            </Button>
                        </div>

                        {/* Trust Signals */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                                    <Truck size={16} />
                                </div>
                                <span>Free Delivery {'>'} ₹2,000</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <ShieldCheck size={16} />
                                </div>
                                <span>Verified Supplier</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mt-12">
                <div className="flex border-b border-gray-100">
                    {["Description", "Specifications", "Reviews"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().slice(0, 4))}
                            className={cn(
                                "px-8 py-5 text-sm font-bold border-b-2 transition-all hover:bg-gray-50",
                                activeTab === tab.toLowerCase().slice(0, 4)
                                    ? "border-[#E8722A] text-[#1B2A4A]"
                                    : "border-transparent text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="p-8 min-h-[200px]">
                    {activeTab === "desc" && (
                        <div className="prose max-w-none text-gray-600 leading-relaxed">
                            <p className="text-base">{product.description}</p>
                        </div>
                    )}
                    {activeTab === "spec" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 max-w-3xl">
                            {Object.entries(product.specs).map(([key, val]) => (
                                <div key={key} className="flex justify-between border-b border-gray-100 pb-3">
                                    <span className="text-gray-500 font-medium">{key}</span>
                                    <span className="text-[#1B2A4A] font-bold">{val}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === "revi" && (
                        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                            <Star size={48} className="text-gray-200 mb-4" />
                            <p>No reviews yet. Be the first to review!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
