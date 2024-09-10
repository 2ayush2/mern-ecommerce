const UserData = require('../models/UserRegister');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../config/config');
const saltRounds = 10;

const register = async (req, res) => {
    const { username, email, password,role } = req.body;
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
            role:role||'user'
        });

        // Save the new user
        await newUser.save();
        return res.status(201).json({ message: "register successful" });
    } catch (error) {
        console.error("register error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

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
            { email: existingUser.email, id: existingUser._id, role:existingUser.role },
            JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        // Set token in cookie and respond
        res.cookie('token', token, { httpOnly: true })
            .json({
                id: existingUser._id,
                email: existingUser.email,
                role:existingUser.role,
                message: "Login successful"
            });
    } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        return res.status(500).json({ error: "Server error" });
    }
};

///For profile
const profile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, JWT_SECRET_KEY, {}, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            res.json(decodedUser); // Respond with the decoded user information
        });
    } else {
        res.json(null); // No token present, respond with null
    }
};
//For Logout
const logout=async(req,res)=>{
    res.clearCookie('token');
    res.json({message:"The cookies has been removed"})
}

module.exports = { register, login , profile ,logout };
 