import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { cn } from "../lib/utils";
import { homeCards, demoProducts } from "../data/homeData";

// Mock Data for Slides
const HERO_SLIDES = [
    {
        id: 1,
        title: "Great Indian Festival",
        subtitle: "Starting Soon",
        bg: "bg-[#232F3E]", // Amazon dark blue
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
        cta: "Explore Now",
        link: "/products"
    },
    {
        id: 2,
        title: "Latest Smartphones",
        subtitle: "Up to 30% Off",
        bg: "bg-[#37475A]",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff59?w=1200&q=80",
        cta: "Shop Mobile",
        link: "/products?category=Electronics"
    },
    {
        id: 3,
        title: "Kitchen Essentials",
        subtitle: "Upgrade your home",
        bg: "bg-[#131921]",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=1200&q=80",
        cta: "View Offers",
        link: "/products?category=Home"
    }
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
                // Try to fetch real data but fallback to our new demo data
                const [catRes, prodRes] = await Promise.all([
                    axios.get("/categories").catch(() => ({ data: { data: [] } })),
                    axios.get("/products?limit=20").catch(() => ({ data: { data: [] } }))
                ]);
                setCategories(catRes.data.data || []);

                // If backend has products, use them, otherwise use our demoProducts
                const apiProducts = prodRes.data.data || [];
                setFeaturedProducts(apiProducts.length > 0 ? apiProducts : demoProducts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch home data", error);
                setFeaturedProducts(demoProducts);
                setLoading(false);
            }
        };
        fetchData();

        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    return (
        <div className="min-h-screen bg-[#E3E6E6] pb-10">
            {/* ───────────────── Category Strip ───────────────── */}
            {/* <div className="bg-[#232F3E] text-white mt-4 md:mt-0 py-2">
                <div className="flex items-center gap-6 px-4 overflow-x-auto scrollbar-hide max-w-[1500px] mx-auto">
                    <button className="flex items-center gap-1 text-sm font-bold whitespace-nowrap">
                        <div className="space-y-1">
                            <span className="block w-4 h-0.5 bg-white"></span>
                            <span className="block w-4 h-0.5 bg-white"></span>
                            <span className="block w-4 h-0.5 bg-white"></span>
                        </div>
                        All
                    </button>
                    {['Fresh', 'Amazon minisTV', 'Sell', 'Best Sellers', "Today's Deals", 'Mobiles', 'Customer Service', 'Electronics'].map((item) => (
                        <Link
                            key={item}
                            to="/products"
                            className="text-sm font-medium hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded-sm whitespace-nowrap"
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div> */}

            {/* ───────────────── Hero Carousel ───────────────── */}
            <div className="relative max-w-[1500px] mx-auto mt-13 md:mt-0">
                <div className="relative overflow-hidden aspect-[2.5/1] md:aspect-[3/1]">
                    <div
                        className="flex transition-transform duration-500 ease-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {HERO_SLIDES.map((slide) => (
                            <div key={slide.id} className="min-w-full h-full relative">
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                {/* Bottom fade gradient */}
                                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#E3E6E6] to-transparent"></div>
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-white/20 transition-colors">
                        <ChevronLeft size={48} className="text-white drop-shadow-md" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-white/20 transition-colors">
                        <ChevronRight size={48} className="text-white drop-shadow-md" />
                    </button>
                </div>
            </div>

            {/* ───────────────── Grid Cards (Simplified) ───────────────── */}
            <div className="max-w-[1500px] mx-auto px-4 -mt-20 relative z-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {homeCards.map((card) => (
                        <div key={card.id} className="bg-white p-5 flex flex-col justify-between shadow-sm cursor-pointer hover:shadow-md transition-shadow min-h-[420px]">
                            <h2 className="text-xl font-bold text-[#0F1111] mb-4 leading-tight">{card.title}</h2>

                            <div className="flex-1">
                                {card.type === 'quadrant' ? (
                                    <div className="grid grid-cols-2 gap-4 h-full">
                                        {card.items.slice(0, 4).map((item, idx) => (
                                            <div key={idx} className="flex flex-col gap-1">
                                                <div className="overflow-hidden bg-gray-50 rounded-sm">
                                                    <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover object-center mix-blend-multiply hover:scale-105 transition-transform" />
                                                </div>
                                                <span className="text-xs text-gray-700 font-medium">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-full">
                                        <img src={card.image} alt={card.title} className="w-full h-full max-h-[300px] object-cover object-center" />
                                    </div>
                                )}
                            </div>

                            <Link to="/products" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium mt-4 block">
                                {card.link}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* ───────────────── Product Feed ───────────────── */}
            <div className="max-w-[1500px] mx-auto px-4 mt-8 space-y-8">

                {/* Section 1: Best Sellers */}
                <div className="bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#0F1111]">Best Sellers in Electronics</h2>
                        <Link to="/products" className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium">See all</Link>
                    </div>
                    {/* Grid Layout (No Scroll) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {featuredProducts.slice(0, 10).map((product) => (
                            <div key={product._id} className="bg-white p-2 hover:shadow-md transition-shadow cursor-pointer border border-transparent hover:border-gray-200 rounded-sm">
                                <div className="h-[200px] flex items-center justify-center p-2 mb-2 bg-[#F7F8F8]">
                                    <img src={product.image || product.images?.[0]} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="text-xs text-[#007185] hover:underline cursor-pointer mb-1 line-clamp-1">{product.name}</div>
                                <div className="text-lg font-medium text-[#B12704]">₹{product.price.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">M.R.P: <span className="line-through">₹{product.mrp.toLocaleString()}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Recommended Grid */}
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-[#0F1111]">Recommended Items</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {featuredProducts.map((product) => (
                            <div key={product._id} className="bg-white border border-gray-200 p-4 hover:shadow-lg transition-shadow rounded-sm flex flex-col h-full">
                                <div className="relative h-[220px] flex items-center justify-center mb-4 bg-[#F7F8F8] p-4">
                                    <img src={product.image || product.images?.[0]} alt={product.name} className="max-h-full max-w-full object-contain" />
                                </div>

                                <div className="flex-1 flex flex-col gap-1">
                                    <Link to={`/product/${product._id}`} className="hover:text-[#C7511F] hover:underline text-gray-900 font-medium line-clamp-2 leading-snug mb-1">
                                        {product.name}
                                    </Link>

                                    <div className="flex items-center gap-1 mb-1">
                                        <div className="flex text-[#FFA41C]">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < Math.floor(product.rating || 4) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating || 4) ? 0 : 2} />
                                            ))}
                                        </div>
                                        <span className="text-[#007185] text-xs hover:underline cursor-pointer ml-1">{product.reviewCount || 100}</span>
                                    </div>

                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl leading-none font-medium text-[#0F1111]">₹{product.price.toLocaleString()}</span>
                                        <span className="text-xs text-gray-500 line-through">₹{product.mrp.toLocaleString()}</span>
                                        <span className="text-xs font-bold text-green-700">
                                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                                        </span>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-1">Get it by <span className="font-bold text-gray-800">Tomorrow, 10PM</span></div>
                                    <div className="text-xs text-gray-500">FREE Delivery by Amazon</div>
                                </div>

                                <button className="mt-3 w-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] hover:border-[#F2C200] rounded-full py-1.5 text-sm font-medium text-[#0F1111] shadow-sm">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Trust/Footer Area */}
                <div className="bg-white p-8 border border-gray-200 text-center space-y-2 mb-8">
                    <h3 className="text-sm font-medium">See personalized recommendations</h3>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border border-yellow-500 w-64 md:w-80 font-medium rounded-md mx-auto block">Sign in</Button>
                    <p className="text-xs text-gray-600">New customer? <Link to="/register" className="text-[#007185] hover:underline">Start here.</Link></p>
                </div>

            </div>
        </div>
    );
};

export default Home;
