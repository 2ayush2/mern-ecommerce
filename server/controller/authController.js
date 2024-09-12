const UserData = require('../models/UserRegister');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { JWT_SECRET_KEY } = require('../config/config');
const saltRounds = 10;

// Register function
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        // Check if user already exists
        const existingUser = await UserData.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new UserData({
            username,
            email,
            password: hashPassword,
            role: role || 'user'
        });

        // Save the new user
        await newUser.save();
        return res.status(201).json({ message: "Register successful" });
    } catch (error) {
        console.error("Register error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

// Login function
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists by email
        const existingUser = await UserData.findOne({ email });
        if (!existingUser) return res.status(400).json({ message: "User does not exist" });

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Set token in cookie and respond
        res.cookie('token', token, { httpOnly: true })
            .json({
                id: existingUser._id,
                email: existingUser.email,
                role: existingUser.role,
                message: "Login successful"
            });
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

// Profile function
const profile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            res.json(decodedUser); // Respond with the decoded user information
        });
    } else {
        res.json(null); // No token present, respond with null
    }
};

// Logout function
const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: "The cookies have been removed" });
};

// Forget Password function
const forget_password = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserData.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ayushkhadka410@gmail.com',
                pass: ' gnic ssle hiyz gqnr ' // Use an app-specific password or environment variable for security
            }
        });

        const mailOptions = {
            from: 'Ecommerce',
            to: `${user.email}`,
            subject: 'Reset password',
            text: `Click the link to reset your password: http://localhost:5173/resetpassword/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Error sending email" });
            }
            res.json({ message: "Email sent" });
        });
    } catch (error) {
        console.error("Forget password error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

// Reset Password function
const reset_password = async (req, res) => {
    const { token } = req.params; // Use req.params for token, not req.parms
    const { password } = req.body;

    try {
        const decodedUser = jwt.verify(token, JWT_SECRET_KEY);
        if (!decodedUser) {
            return res.status(404).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Update user's password
        const user = await UserData.findById(decodedUser.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = hashPassword;
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

module.exports = { register, login, profile, logout, forget_password, reset_password };
