const dotenv = require('dotenv');
dotenv.config();  // Load environment variables from .env file

module.exports = {
    PORT: process.env.PORT || 5000,                  // Use PORT from .env or default to 5000
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,      // Use JWT_SECRET_KEY from .env
};
