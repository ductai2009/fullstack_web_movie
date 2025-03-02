const tmdbService = require('../services/tmdb.service.js');
const User = require('../models/user.model.js');
const Comment = require('../models/comment.model.js');
const addComment = async (req, res) => {
    try {
        const { username, email, comment, image, reply_id, like, dislike, id_movie } = req.body;
        if (!email || !comment || !username || !id_movie) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống: ' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
        }

        const checkEmail = await User.findOne({ email: email });

        if (!checkEmail) {
            return res.status(400).json({ success: false, message: 'Không có dữ liệu email' });
        }

        const commentSchema = new Comment({
            username: username,
            email: email,
            comment: comment,
            image: image,
            reply_id: reply_id,
            like: like,
            dislike: dislike,
            id_movie: id_movie,
        });

        await commentSchema.save();
        return res.status(200).json({
            success: true,
            message: 'Thêm bình luận thành công',
            comment: {
                commentSchema,
            },
        });
    } catch (err) {
        console.error('Error addComment:', err.message);
        return res.status(500).json({ success: false, message: 'addComment error' });
    }
};

const addReplyComment = async (req, res) => {
    try {
        const { username, email, comment, like, dislike, image, id, reply_by, reply_cmt } = req.body;
        if (!email || !comment || !username || !id) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
        }

        const checkEmail = await User.findOne({ email: email });

        if (!checkEmail) {
            return res.status(400).json({ success: false, message: 'Không có dữ liệu email' });
        }

        await Comment.findOneAndUpdate(
            { _id: id },
            {
                $push: {
                    replies: {
                        username: username,
                        email: email,
                        comment: comment,
                        image: image,
                        reply_by: reply_by,
                        reply_cmt: reply_cmt,
                    },
                },
            },
            { new: true }, // Trả về dữ liệu mới sau khi cập nhật
        );

        return res.status(200).json({
            success: true,
            message: 'Reply bình luận thành công',
        });
    } catch (err) {
        console.error('Error addReplyComment:', err.message);
        return res.status(500).json({ success: false, message: 'addReplyComment error' });
    }
};

const getComment = async (req, res) => {
    try {
        const id_movie = req.query.id_movie;
        if (!id_movie) {
            return res.status(400).json({ success: false, message: 'id movie trống' });
        }

        // const commentSchema = await Comment.find({ id_movie: id_movie });
        const commentSchema = await Comment.aggregate([
            { $match: { id_movie: id_movie } },
            { $sort: { createdAt: -1 } },
            {
                $addFields: {
                    replies: {
                        $sortArray: { input: '$replies', sortBy: { createdAt: -1 } },
                    },
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            message: 'Get bình luận thành công',
            comment: {
                commentSchema,
            },
        });
    } catch (err) {
        console.error('Error getComment:', err.message);
        return res.status(500).json({ success: false, message: 'getComment error' });
    }
};

module.exports = { addComment, getComment, addReplyComment };
