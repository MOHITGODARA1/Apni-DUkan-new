import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, Clock, Star, TrendingUp, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";

// Mock Data for Demo
const HERO_SLIDES = [
    {
        id: 1,
        title: "Bulk Savings Festival",
        subtitle: "Up to 40% OFF on Wholesale Orders",
        bg: "bg-gradient-to-r from-[#1B2A4A] to-[#2C4270]",
        image: "https://placehold.co/600x400/png?text=Bulk+Savings",
        cta: "Shop Deals",
        link: "/products?tag=deals"
    },
    {
        id: 2,
        title: "New Arrivals: Electronics",
        subtitle: "Stock up on the latest gadgets",
        bg: "bg-gradient-to-r from-[#E8722A] to-[#F2994A]",
        image: "https://placehold.co/600x400/png?text=Electronics",
        cta: "Browse New",
        link: "/products?category=Electronics"
    }
];

const MOCK_DEALS = [
    { _id: "d1", name: "Premium Basmati Rice", price: 85, mrp: 120, image: "https://placehold.co/400x400?text=Rice", rating: 4.5, reviewCount: 128 },
    { _id: "d2", name: "Sunflower Oil 5L", price: 650, mrp: 800, image: "https://placehold.co/400x400?text=Oil", rating: 4.8, reviewCount: 342 },
    { _id: "d3", name: "Sugar 50kg Sack", price: 1800, mrp: 2200, image: "https://placehold.co/400x400?text=Sugar", rating: 4.2, reviewCount: 89 },
    { _id: "d4", name: "Tea Powder 1kg", price: 240, mrp: 350, image: "https://placehold.co/400x400?text=Tea", rating: 4.6, reviewCount: 210 },
];

const Home = () => {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, prodRes] = await Promise.all([
                    axios.get("/categories"),
                    axios.get("/products?limit=20")
                ]);
                setCategories(catRes.data.data || []);
                setFeaturedProducts(prodRes.data.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch home data", error);

                // Fallback mock data if API fails or returns empty
                setFeaturedProducts(Array(12).fill(null).map((_, i) => ({
                    _id: `mock-${i}`,
                    name: `Demo Product ${i + 1}`,
                    price: 100 + i * 50,
                    mrp: 150 + i * 60,
                    category: "General",
                    images: [`https://placehold.co/400?text=Product+${i + 1}`],
                    rating: 4.0,
                    reviewCount: 10,
                    stock: 100
                })));
                setLoading(false);
            }
        };
        fetchData();

        // Auto-advance slider
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* ───────────────── Category Strip (Amazon Style) ───────────────── */}
            <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide sticky top-16 z-30 shadow-sm">
                <div className="flex items-center gap-6 px-4 py-3 min-w-max mx-auto max-w-[1400px]">
                    {[{ _id: 'all', name: 'All Categories' }, ...categories].map((cat) => (
                        <Link
                            key={cat._id}
                            to={`/products?category=${cat.name}`}
                            className="text-sm font-medium text-gray-700 hover:text-[#E8722A] hover:underline whitespace-nowrap transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-10">

                {/* ───────────────── Hero Carousel ───────────────── */}
                <div className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[21/9] md:aspect-[3/1]">
                    <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {HERO_SLIDES.map((slide) => (
                            <div key={slide.id} className={cn("min-w-full h-full relative flex items-center px-10 md:px-20", slide.bg)}>
                                <div className="max-w-xl text-white space-y-4 z-10">
                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                                        Special Offer
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-sm">{slide.title}</h1>
                                    <p className="text-lg md:text-xl text-white/90 font-medium">{slide.subtitle}</p>
                                    <Link to={slide.link}>
                                        <Button className="mt-4 bg-white text-[#1B2A4A] hover:bg-gray-100 font-bold px-8 h-12 rounded-xl shadow-lg border-none">
                                            {slide.cta} <ArrowRight size={18} className="ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20 md:opacity-100 mix-blend-overlay md:mix-blend-normal">
                                    <div className="w-full h-full bg-gradient-to-l from-black/20 to-transparent absolute z-10"></div>
                                    <img src={slide.image} alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Slider Controls */}
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {HERO_SLIDES.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={cn("w-2 h-2 rounded-full transition-all", currentSlide === idx ? "bg-white w-6" : "bg-white/50")}
                            />
                        ))}
                    </div>
                </div>

                {/* ───────────────── Deal of the Day ───────────────── */}
                <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-[#E8722A] font-bold mb-1">
                                <Zap size={20} fill="currentColor" />
                                <span className="uppercase tracking-widest text-xs">Limited Time Offer</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#1B2A4A]">Deals of the Day</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-mono font-bold">
                            <Clock size={16} /> Ends in: 04:23:15
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {MOCK_DEALS.map((product) => (
                            <Link key={product._id} to={`/products`} className="group">
                                <div className="bg-[#F7F8FA] rounded-xl p-4 mb-3 border border-gray-100 group-hover:border-[#E8722A]/30 transition-colors relative">
                                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                    </div>
                                    <img src={product.image} alt={product.name} className="w-full aspect-square object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="font-bold text-[#1B2A4A] line-clamp-1 group-hover:text-[#E8722A] transition-colors">{product.name}</h3>
                                <div className="flex items-end gap-2 mt-1">
                                    <span className="text-lg font-bold text-[#1B2A4A]">₹{product.price}</span>
                                    <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ───────────────── Featured / Recommended ───────────────── */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#1B2A4A]">Recommended for You</h2>
                        <Link to="/products" className="text-sm font-bold text-[#E8722A] hover:underline flex items-center gap-1">
                            Browse All <ArrowRight size={16} />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {Array(10).fill(0).map((_, i) => (
                                <div key={i} className="bg-white h-[300px] rounded-2xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {/* Merge real products with mock if explicit count needed, but normally use real */}
                            {featuredProducts.length > 0 ? (
                                featuredProducts.slice(0, 15).map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                // This won't run if we use fallback in fetch, but good safety
                                <div className="col-span-full text-center py-20 text-gray-400">No products found</div>
                            )}
                        </div>
                    )}
                </section>

                {/* ───────────────── Trust Features ───────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 pb-8 border-t border-gray-200">
                    {[
                        { icon: TrendingUp, title: "Best Wholesale Prices", desc: "Save up to 40% on bulk orders" },
                        { icon: Star, title: "Verified Quality", desc: "Sourced directly from brands" },
                        { icon: Clock, title: "Fast Delivery", desc: "Next-day delivery securely" }
                    ].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-[#E8722A]/10 flex items-center justify-center text-[#E8722A] shrink-0">
                                <feat.icon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#1B2A4A] text-lg mb-1">{feat.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Home;
