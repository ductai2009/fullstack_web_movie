// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const userSearchSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const UserSearch = mongoose.model('UserSearch', userSearchSchema);
module.exports = UserSearch;
