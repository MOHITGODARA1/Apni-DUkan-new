import api from "./api";

const productService = {
    // Get all products
    getAllProducts: async () => {
        const response = await api.get("/products");
        return response.data;
    },

    // Get single product
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Add new product
    addProduct: async (productData) => {
        const response = await api.post("/products", productData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    // Update product
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    // Delete product
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },
};

export default productService;
