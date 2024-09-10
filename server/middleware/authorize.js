const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/config'); // Ensure this path is correct

const authenticate = async (req, res, next) => {
    try {
        // Extract token from cookies
        const { token } = req.cookies;
        console.log('Token:', token); // Log the token for debugging

        // Check if token is not provided
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token and decode user information
        jwt.verify(token, JWT_SECRET_KEY, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }

            // Attach decoded user to request object
            req.user = decodedUser;

            // Proceed to the next middleware or route handler
            next();
        });

    } catch (error) {
        console.error('Authentication error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error }); // Return a server error response
    }
};

// Authorization Middleware
const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user role is included in allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied for the roles" });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};
