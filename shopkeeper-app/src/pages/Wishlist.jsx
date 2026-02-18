import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { Button } from "../components/ui/Button";

const Wishlist = () => {
    const { wishlistItems } = useWishlist();

    if (wishlistItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center relative">
                    <Heart className="w-10 h-10 text-gray-300" />
                    <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">Your Wishlist is Empty</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">Looks like you haven't saved any items yet. Start exploring and save your favorites!</p>
                </div>
                <Link to="/products">
                    <Button className="bg-[#E8722A] hover:bg-[#D4651F] text-white px-8 h-12 rounded-xl font-bold shadow-lg shadow-orange/20 transition-all hover:scale-105 active:scale-95">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 p-6 md:p-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8722A]/10 flex items-center justify-center text-[#E8722A]">
                    <Heart size={20} fill="currentColor" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-[#1B2A4A]">My Wishlist</h1>
                    <p className="text-gray-500 text-sm">{wishlistItems.length} saved items</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item, idx) => (
                    <div key={item._id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
