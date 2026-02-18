import { useState, useEffect } from "react";
import axios from "axios";
import { Filter, ChevronDown, Check } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Button } from "../components/ui/Button";

// MOCK DATA (Expanded)


const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                axios.get("/products"),
                axios.get("/categories")
            ]);
            setProducts(prodRes.data.data || []);
            setCategories(catRes.data.data || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch data");
            setLoading(false);
        }
    };

    const toggleCategory = (cat) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const filteredProducts = selectedCategories.length > 0
        ? products.filter(p => selectedCategories.includes(p.category))
        : products;

    if (loading) return <div className="p-10 text-center">Loading products...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto min-h-screen p-6">

            {/* LEFT SIDEBAR - FILTERS */}
            <aside className={`
        fixed inset-y-0 left-0 bg-white w-[280px] z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block md:w-[260px] md:bg-transparent
        ${mobileFiltersOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
                <div className="h-full overflow-y-auto p-6 md:p-0 md:pr-6 space-y-8">
                    <div className="flex items-center justify-between md:hidden mb-6">
                        <h3 className="font-bold text-xl text-[#1B2A4A]">Filters</h3>
                        <button onClick={() => setMobileFiltersOpen(false)} className="p-2 bg-gray-50 rounded-lg">✕</button>
                    </div>

                    {/* Section: Categories */}
                    <div>
                        <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest">Categories</h3>
                        <div className="space-y-3">
                            {categories.map(cat => (
                                <label key={cat._id} className="flex items-center gap-3 cursor-pointer group select-none">
                                    <div className={`
                                        w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
                                        ${selectedCategories.includes(cat.name)
                                            ? "bg-[#E8722A] border-[#E8722A] text-white"
                                            : "border-gray-300 bg-white group-hover:border-[#1B2A4A]"}
                                    `}>
                                        {selectedCategories.includes(cat.name) && <Check size={12} strokeWidth={4} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedCategories.includes(cat.name)}
                                        onChange={() => toggleCategory(cat.name)}
                                    />
                                    <span className={`text-sm font-medium transition-colors ${selectedCategories.includes(cat.name) ? "text-[#1B2A4A]" : "text-gray-500 group-hover:text-[#1B2A4A]"}`}>
                                        {cat.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button
                        onClick={() => setSelectedCategories([])}
                        className="w-full h-11 border-2 border-[#E8722A] text-[#E8722A] bg-transparent hover:bg-[#E8722A] hover:text-white transition-all rounded-xl font-bold text-sm shadow-none"
                    >
                        Reset Filters
                    </Button>
                </div>
            </aside>

            {/* Mobile Filter Overlay */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 bg-[#1B2A4A]/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileFiltersOpen(false)} />
            )}

            {/* MAIN CONTENT */}
            <div className="flex-1">
                {/* Top Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1B2A4A] tracking-tight">All Products</h1>
                        <p className="text-gray-500 text-sm mt-1">Showing <span className="font-bold text-[#1B2A4A]">{filteredProducts.length}</span> results</p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-[#1B2A4A] font-medium shadow-sm flex-1 justify-center"
                        >
                            <Filter size={18} /> Filters
                        </button>

                        <div className="relative group flex-1 sm:flex-none">
                            <button className="w-full sm:w-auto flex items-center justify-between gap-3 text-sm font-medium text-[#1B2A4A] px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white shadow-sm transition-all">
                                <span>Best Selling</span>
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {/* Dropdown would go here */}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 border-dashed">
                        <div className="p-4 bg-gray-50 rounded-full mb-3">
                            <Filter className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-[#1B2A4A]">No products found</h3>
                        <p className="text-gray-500 text-sm">Try changing your filters.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Products;
