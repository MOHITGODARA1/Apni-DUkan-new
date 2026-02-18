const express = require('express');
const router = express.Router();
const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin, retailer } = require('../middleware/roleMiddleware');
const { check } = require('express-validator');

// Validation
const orderValidation = [
    check('items', 'Items are required and must be an array').isArray({ min: 1 }),
    check('shippingAddress', 'Shipping address is required').not().isEmpty()
];

router.route('/')
    .post(protect, retailer, orderValidation, placeOrder)
    .get(protect, admin, getAllOrders);

router.route('/my')
    .get(protect, retailer, getMyOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/status')
    .put(protect, admin, updateOrderStatus);

router.route('/:id/cancel')
    .put(protect, retailer, cancelOrder);

module.exports = router;
