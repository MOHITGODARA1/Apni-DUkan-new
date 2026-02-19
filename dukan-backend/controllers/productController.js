const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Add new product
// @route   POST /api/products
// @access  Private/Admin
const addProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category,
        price,
        bulkPrice,
        minBulkQty,
        stock
    } = req.body;

    // Handle image upload
    let images = [];
    if (req.files) {
        req.files.forEach(file => {
            images.push(file.path);
        });
    }

    const product = await Product.create({
        name,
        description,
        category,
        price,
        bulkPrice,
        minBulkQty,
        stock,
        images
    });

    res.status(201).json({
        success: true,
        data: product
    });
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
    const {
        category,
        search,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10
    } = req.query;

    const query = {};

    // Filter by category
    if (category) {
        query.category = category;
    }

    // Search by name
    if (search) {
        query.name = { $regex: search, $options: 'i' };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
        .populate('category', 'name')
        .limit(Number(limit))
        .skip(skip)
        .sort({ createdAt: -1 });

    const count = await Product.countDocuments(query);

    res.json({
        success: true,
        data: products,
        pagination: {
            total: count,
            page: Number(page),
            pages: Math.ceil(count / limit)
        }
    });
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
        res.json({
            success: true,
            data: product
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category,
        price,
        bulkPrice,
        minBulkQty,
        stock,
        isActive
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.price = price || product.price;
        product.bulkPrice = bulkPrice || product.bulkPrice;
        product.minBulkQty = minBulkQty || product.minBulkQty;
        product.stock = stock || product.stock;
        if (isActive !== undefined) product.isActive = isActive;

        // Note: For now, keeping existing images. 
        // Image update logic would be more complex (delete old, add new)

        const updatedProduct = await product.save();
        res.json({
            success: true,
            data: updatedProduct
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: req.params.id });
        res.json({
            success: true,
            message: 'Product removed'
        });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
