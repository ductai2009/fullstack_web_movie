// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'user',
        },
        status: {
            type: String,
            required: true,
            default: 'active',
        },
        image: {
            type: String,
            default: '',
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
