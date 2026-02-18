const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

// @desc    Add new category
// @route   POST /api/categories
// @access  Private/Admin
const addCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400);
        throw new Error('Category already exists');
    }

    const category = await Category.create({
        name,
        description
    });

    res.status(201).json({
        success: true,
        data: category
    });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json({
        success: true,
        data: categories
    });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
    // Mongoose v8 uses findByIdAndDelete
    // Check if category exists first
    const category = await Category.findById(req.params.id);

    if (category) {
        await Category.deleteOne({ _id: req.params.id });
        res.json({
            success: true,
            message: 'Category removed'
        });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory
};
