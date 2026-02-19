import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Filter, MoreVertical, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts();
            setProducts(data.data || []); // Backend returns { success: true, data: [...] }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await productService.deleteProduct(id);
                setProducts(prev => prev.filter(p => p._id !== id));
            } catch (error) {
                console.error("Failed to delete product:", error);
                alert("Failed to delete product");
            }
        }
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = categoryFilter === "All" || product.category?.name === categoryFilter || product.category === categoryFilter; // Handle populated category or string
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-white">Product Management</h1>
                <button
                    onClick={() => navigate("/products/add")}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Plus size={18} />
                    Add New Product
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#111827] p-4 rounded-lg border border-[#1f2937] flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg pl-10 pr-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                    />
                </div>

                <div className="flex gap-2">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2 text-white outline-none focus:border-[#3b82f6]"
                    >
                        <option value="All">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Grocery">Grocery</option>
                    </select>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#111827] rounded-lg border border-[#1f2937] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-[#1f2937] text-gray-200 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f2937]">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-[#1f2937]/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-[#374151] overflow-hidden">
                                                <img
                                                    src={product.images?.[0] || "https://via.placeholder.com/40"}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-white">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300">{product.category?.name || product.category || "Uncategorized"}</td>
                                    <td className="px-6 py-4 text-gray-300">₹{product.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 0
                                                ? "bg-green-500/10 text-green-500"
                                                : "bg-red-500/10 text-red-500"
                                            }`}>
                                            {product.stock > 0 ? "Active" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1 hover:bg-[#374151] rounded text-gray-400 hover:text-blue-400">
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-1 hover:bg-[#374151] rounded text-gray-400 hover:text-red-400"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
