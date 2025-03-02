const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);
const disLikeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        dislike: {
            type: Number,
            default: 0,
        },

        image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

// Schema cho phản hồi (reply)
const replyCmtSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        reply_by: {
            type: String,
            default: '',
        },
        reply_cmt: {
            type: String,
            default: '',
        },
        like: {
            type: [likeSchema],
            default: [],
        },
        dislike: {
            type: [disLikeSchema],
            default: [],
        },
        image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);
// Schema cho bình luận (comment)
const commentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        id_movie: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        replies: {
            type: [replyCmtSchema],
            default: [],
        },

        like: {
            type: [likeSchema],
            default: [],
        },
        dislike: {
            type: [disLikeSchema],
            default: [],
        },

        image: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

// Tạo model từ schema
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
