const express = require('express');
const router = express.Router();
const Products = require('../data/products'); // Ensure this path is correct

// Get all products
router.get('/', async (req, res) => {
    try {
        res.json(Products);
    } catch (error) {
        res.status(500).json({ message: "This is the error" });
    }
});

// Get product by ID
router.get('/:id', (req, res) => {
    const product = Products.find((item) => item._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

module.exports = router;
