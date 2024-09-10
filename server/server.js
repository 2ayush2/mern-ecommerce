const express = require('express');
const {PORT}=require('./config/config.js')
const Products = require('./data/products.js');
const authRoute = require('./routes/auth-router.js');
const database=require('./config/db.js')
const cookieParser=require('cookie-parser')

const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// Product routes
app.get('/api/products', (req, res) => {
    res.json(Products);
});

app.get('/api/product/:id', (req, res) => {
    const product = Products.find((product) => product._id === req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// Home route
app.get('/home', (req, res) => {
    res.json("This is the data you are searching for");
});

// Auth route
app.use('/api', authRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
