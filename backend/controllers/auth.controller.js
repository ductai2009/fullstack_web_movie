const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const handlePassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};
const login = async function (req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email không tồn tại' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Mật khẩu không chính xác' });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            user: {
                ...user._doc,
                password: '',
            },
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const logout = function (req, res) {
    try {
        res.clearCookie('jwt_account');
        return res.status(200).json({ success: true, message: 'Logout successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const register = async function (req, res) {
    try {
        const { email, password, username, role, status, isCookie } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Các trường bắt buộc không được để trống' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Mật khật phải nhất 6 ki tự' });
        }
        const checkEmail = await User.findOne({ email: email });
        const checkUsername = await User.findOne({ username: username });
        if (checkUsername) {
            return res.status(400).json({ success: false, message: 'Username đã tồn tại' });
        }
        if (checkEmail) {
            return res.status(400).json({ success: false, message: 'Email đã tồn tại' });
        }

        const image_arr = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
        const randomIndex = Math.floor(Math.random() * image_arr.length);
        const randomImage = image_arr[randomIndex];

        const hashedPassword = await handlePassword(password);

        const user = new User({
            email: email,
            password: hashedPassword,
            username: username,
            role: role,
            status: status,
            image: randomImage,
        });
        if (isCookie === true) {
            generateToken(user._id, res);
        }
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Đăng ký thành công',
            user: {
                ...user._doc,
                password: '',
            },
        });
    } catch (err) {
        console.log('register error: ', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const authCheck = async function (req, res) {
    try {
        return res.status(200).json({ success: true, user: req.user, message: 'is checked' });
    } catch (err) {
        console.log('authCheck error: ', err);
        return res.status(500).json({ success: false, message: 'no auth' });
    }
};
const changePassword = async function (req, res) {
    try {
        const { id, password, newPassword } = req.body;
        var message_error = [];
        if (!id) message_error.push('id');
        if (!password) message_error.push('password');
        if (!newPassword) message_error.push('newPassword');

        if (message_error.length > 0) {
            return res
                .status(400)
                .json({ success: false, message: message_error.join(', ') + ' bắt buộc không được để trống' });
        }

        const hashedPassword = await handlePassword(newPassword);

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin tài khoản.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: 'Mật khẩu đăng nhập không đúng.' });
        }
        user.password = hashedPassword;
        user.save();

        return res
            .status(200)
            .json({ success: true, user: { ...user._doc, password: '' }, message: 'Đổi mật khẩu thành công.' });
    } catch (err) {
        console.log('changePassword error: ', err);
        return res.status(500).json({ success: false, message: 'changePassword err', data: err.message });
    }
};
const getUser = async function (req, res) {
    try {
        if (req.user.isAdmin == false)
            return res.status(403).json({ success: false, user: req.user.email, message: 'You are not admin' });
        const users = await User.find().sort({ username: 1 }).allowDiskUse(true);

        const sanitizedUsers = users.map((user) => ({
            ...user.toObject(),
            password: '',
        }));

        return res.status(200).json({
            success: true,
            user: sanitizedUsers,
            message: 'Get all users',
        });
    } catch (err) {
        console.log('getUser error: ', err);
        return res.status(500).json({ success: false, message: 'getUser err' });
    }
};

const updateUser = async function (req, res) {
    try {
        const { id } = req.body;
        if (req.user.isAdmin == false) {
            return res.status(403).json({ success: false, message: 'You are not admin' });
        }
        if (!id) {
            return res.status(400).json({ success: false, message: 'id không hợp lệ' });
        }
        const userUpdate = {
            username: req.body.username,
            email: req.body.email,
            image: req.body.image,
            role: req.body.role,
            status: req.body.status,
        };

        const user = await User.findByIdAndUpdate(id, userUpdate, { new: true }); // new là return giá trị mới sau khi update, nếu ko nó return giá trị trước khi update
        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }
        return res
            .status(200)
            .json({ success: true, user: { ...user._doc, password: '' }, message: 'Cập nhật thành công' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteUser = async function (req, res) {
    try {
        const { id } = req.body;
        if (req.user.isAdmin == false) {
            return res.status(403).json({ success: false, message: 'You are not admin' });
        }
        if (!id) {
            return res.status(400).json({ success: false, message: 'id không hợp lệ' });
        }

        const user = await User.findByIdAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User không tồn tại' });
        }
        return res
            .status(200)
            .json({ success: true, user: { ...user._doc, password: '' }, message: 'xóa user thành công' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
module.exports = { login, logout, register, authCheck, getUser, updateUser, deleteUser, changePassword };
