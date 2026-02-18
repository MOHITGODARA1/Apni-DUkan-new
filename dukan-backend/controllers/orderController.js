const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Place a new order
// @route   POST /api/orders
// @access  Private/Retailer
const placeOrder = asyncHandler(async (req, res) => {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    let orderItems = [];
    let totalAmount = 0;

    // Validate stock and calculate price
    // Note: Using a for...of loop to handle async await correctly
    for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
            res.status(400);
            throw new Error(`Insufficient stock for product: ${product.name}`);
        }

        // Calculate price (apply bulk pricing if applicable)
        let price = product.price;
        if (product.bulkPricing && product.bulkPricing.length > 0) {
            const applicableTier = product.bulkPricing.find(tier =>
                item.quantity >= tier.minQty &&
                (!tier.maxQty || item.quantity <= tier.maxQty)
            );
            if (applicableTier) {
                price = applicableTier.price;
            }
        }

        totalAmount += price * item.quantity;

        // Deduct stock
        product.stock -= item.quantity;
        await product.save();

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            priceAtOrder: price
        });
    }

    const order = await Order.create({
        retailer: req.user._id,
        items: orderItems,
        totalAmount,
        shippingAddress
    });

    res.status(201).json({
        success: true,
        data: order
    });
});

// @desc    Get logged in retailer orders
// @route   GET /api/orders/my
// @access  Private/Retailer
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ retailer: req.user._id }).sort({ createdAt: -1 });
    res.json({
        success: true,
        data: orders
    });
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find({})
        .populate('retailer', 'name email')
        .limit(limitNum)
        .skip(skip)
        .sort({ createdAt: -1 });

    const count = await Order.countDocuments({});

    res.json({
        success: true,
        data: orders,
        pagination: {
            total: count,
            page: pageNum,
            pages: Math.ceil(count / limitNum)
        }
    });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('retailer', 'name email phone')
        .populate('items.product', 'name images');

    if (order) {
        // Check permissions: Admin or owner of the order
        if (req.user.role === 'admin' || order.retailer._id.toString() === req.user._id.toString()) {
            res.json({
                success: true,
                data: order
            });
        } else {
            res.status(403);
            throw new Error('Not authorized to view this order');
        }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status;
        if (status === 'delivered') {
            order.paymentStatus = 'paid'; // Assuming payment on delivery or synced
        }

        const updatedOrder = await order.save();
        res.json({
            success: true,
            data: updatedOrder
        });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private/Retailer
const cancelOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        if (order.retailer.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to cancel this order');
        }

        if (order.status !== 'pending') {
            res.status(400);
            throw new Error('Cannot cancel order that is not pending');
        }

        order.status = 'cancelled';
        await order.save();

        // Restore stock
        for (const item of order.items) {
            const product = await Product.findById(item.product);
            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        res.json({
            success: true,
            message: 'Order cancelled successfully'
        });
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
};
