const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure username is unique
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum:['user', 'admin' ],
        default:'user',
    }
});

const UserModel = mongoose.model('User', UserSchema); // Adjust the name as needed

module.exports = UserModel;
