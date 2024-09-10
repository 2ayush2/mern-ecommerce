const express = require('express');
const {login,register,profile,logout} = require('../controller/authController'); // Adjusted import path
const router = express.Router();
const {authenticate,authorize}=require('../middleware/authorize')

// Define the route and use the controller
router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile);
router.post('/logout', logout);
//admin dashboard

// Route accessible to both users and admins
router.get('/user', authenticate, authorize('user', 'admin'), (req, res) => {
    res.json({
        message: `Welcome to your dashboard, ${req.user.username}!`,
        role: req.user.role
    });
});
// Route accessible to both admins
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
    res.json({
        message: `Welcome to your dashboard, ${req.user.username}!`,
        role: req.user.role
    });
});


module.exports = router;
