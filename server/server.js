const express = require('express');
const { PORT } = require('./config/config.js');
const productRouter= require('./routes/porductRouter.js'); // Ensure this path is correct
const authRoute  = require('./routes/auth-router.js'); // Ensure this path is correct
const database = require('./config/db.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to the database

// Home route
app.get('/home', (req, res) => {
    res.json("This is the data you are searching for");
});

// Product and Auth routes
app.use('/api/products', productRouter); // Mount productRouter at /api/products
app.use('/api', authRoute); // Mount authRoute at /api/auth

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
