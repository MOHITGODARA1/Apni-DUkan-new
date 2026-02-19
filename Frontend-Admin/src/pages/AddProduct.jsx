import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Save, X, ArrowLeft, Loader } from "lucide-react";
import productService from "../services/productService";

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics", // Default value
        stock: "",
        image: null
    });
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("price", formData.price);
            data.append("category", formData.category); // Assuming backend handles string or ID
            data.append("stock", formData.stock);

            if (formData.image) {
                data.append("images", formData.image); // Field name matches backend upload.array('images')
            }

            await productService.addProduct(data);
            navigate("/products");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate("/products")}
                    className="p-2 bg-[#1f2937] text-white rounded-lg hover:bg-[#374151] transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-2xl font-bold text-white">Add New Product</h1>
            </div>

            <div className="bg-[#111827] rounded-lg border border-[#1f2937] p-6 max-w-4xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#3b82f6]"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#3b82f6]"
                                    placeholder="Enter product description"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Price (₹)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#3b82f6]"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Stock Quantity</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#3b82f6]"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-[#1f2937] border border-[#374151] rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#3b82f6]"
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Grocery">Grocery</option>
                                    <option value="Home">Home & Furniture</option>
                                </select>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="text-sm font-medium text-gray-300">Product Image</label>
                            <div className="border-2 border-dashed border-[#374151] rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-[#3b82f6] transition-colors cursor-pointer relative h-64 bg-[#1f2937]/50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {previewUrl ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-contain"
                                        />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData(prev => ({ ...prev, image: null }));
                                                setPreviewUrl(null);
                                            }}
                                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-4 bg-[#374151] rounded-full mb-4">
                                            <Upload size={24} className="text-gray-400" />
                                        </div>
                                        <p className="text-sm text-gray-400 font-medium">Click to upload image</p>
                                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-[#374151]">
                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="px-6 py-2.5 border border-[#374151] text-gray-300 rounded-lg hover:bg-[#374151] transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-[#3b82f6] text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
