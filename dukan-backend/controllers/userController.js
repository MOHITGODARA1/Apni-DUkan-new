const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                businessName: user.businessName,
                address: user.address,
                isVerified: user.isVerified
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.businessName = req.body.businessName || user.businessName;
        user.address = req.body.address || user.address;

        if (req.body.password) {
            // If password update is needed, we need to hash it here or use a pre-save hook in model
            // For now, assuming password update is separate or not in requirements for this specific endpoint
            // But based on prompt "Accept: name, phone, businessName, address", password is not listed.
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                phone: updatedUser.phone,
                businessName: updatedUser.businessName,
                address: updatedUser.address
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        data: users
    });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.json({
            success: true,
            data: user
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById
};
