const express = require('express');
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { check } = require('express-validator');

// Validation middleware
const productValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').isNumeric(),
    check('stock', 'Stock is required').isNumeric(),
];

router.route('/')
    .get(getAllProducts)
    .post(upload.array('images', 5), productValidation, addProduct);

router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(deleteProduct);

module.exports = router;
