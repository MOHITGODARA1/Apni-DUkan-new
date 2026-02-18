import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "./ui/Button";
import StarRating from "./ui/StarRating";
import QuantitySelector from "./ui/QuantitySelector";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { cn } from "../lib/utils";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();

    // Initialize quantity with MOQ
    const [qty, setQty] = useState(product.moq || 1);

    const discountPercentage = product.mrp
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, qty);
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    }

    const isLiked = isWishlisted(product._id);
    const isOutOfStock = product.stock <= 0;

    return (
        <Link
            to={`/products/${product._id}`}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col"
        >
            {/* Image Container */}
            <div className="relative aspect-square bg-[#F7F8FA] overflow-hidden">
                <img
                    src={product.images?.[0] || "https://placehold.co/400x400?text=No+Image"}
                    alt={product.name}
                    className={cn(
                        "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                        isOutOfStock && "opacity-50 grayscale"
                    )}
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {isOutOfStock ? (
                        <span className="bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                            Out of Stock
                        </span>
                    ) : (
                        <>
                            {product.tags?.includes("deal") && (
                                <span className="bg-[#E8722A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    Deal
                                </span>
                            )}
                            {product.tags?.includes("new") && (
                                <span className="bg-[#1B2A4A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                    New
                                </span>
                            )}
                        </>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-500" : ""} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title & Brand */}
                <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{product.brand}</p>
                    <h3 className="font-bold text-[#1B2A4A] text-sm leading-snug line-clamp-2 min-h-[40px] group-hover:text-[#E8722A] transition-colors" title={product.name}>
                        {product.name}
                    </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={product.rating || 0} count={product.reviewCount} />
                </div>

                <div className="mt-auto space-y-4">
                    {/* Pricing */}
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-[#1B2A4A]">₹{product.price.toLocaleString()}</span>
                            <span className="text-xs text-gray-500 font-medium">/ unit</span>
                        </div>
                        {product.mrp && product.mrp > product.price && (
                            <div className="flex items-center gap-2 text-xs mt-1">
                                <span className="text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
                                <span className="text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                                    Save ₹{(product.mrp - product.price).toLocaleString()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                        {/* Compact Quantity Selector */}
                        <div className="flex items-center border border-gray-200 rounded-lg h-9 w-24">
                            <button
                                onClick={(e) => { e.preventDefault(); setQty(Math.max((product.moq || 1), qty - 1)); }}
                                className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] hover:bg-gray-50 rounded-l-lg transition-colors"
                            >-</button>
                            <span className="flex-1 text-center text-sm font-bold text-[#1B2A4A]">{qty}</span>
                            <button
                                onClick={(e) => { e.preventDefault(); setQty(Math.min(product.stock, qty + 1)); }}
                                className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[#1B2A4A] hover:bg-gray-50 rounded-r-lg transition-colors"
                            >+</button>
                        </div>

                        <Button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={cn(
                                "flex-1 h-9 text-xs font-bold rounded-xl shadow-sm transition-all active:scale-95",
                                isOutOfStock
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-[#E8722A] hover:bg-[#D4651F] text-white hover:shadow-md"
                            )}
                        >
                            {isOutOfStock ? "Notify Me" : "Add"}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
