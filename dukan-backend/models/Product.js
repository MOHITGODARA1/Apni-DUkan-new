const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: true
    },
    bulkPricing: [{
        minQty: { type: Number, required: true },
        maxQty: { type: Number }, // null for infinite
        price: { type: Number, required: true }
    }],
    stock: {
        type: Number,
        required: true
    },
    images: [{
        type: String
    }],
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // admin
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
