const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/')
    .get(getAllCategories)
    .post(protect, admin, addCategory);

router.route('/:id')
    .delete(protect, admin, deleteCategory);

module.exports = router;
