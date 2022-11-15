const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerify: {
        type: Number,
        default: 0,
    },
    img:{
        type: String,
    }
},{timestamps: true});

module.exports = mongoose.model('User', UserSchema);