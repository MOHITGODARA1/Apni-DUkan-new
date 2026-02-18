const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers, getUserById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

router.route('/')
    .get(protect, admin, getAllUsers);

router.route('/:id')
    .get(protect, admin, getUserById);

module.exports = router;
