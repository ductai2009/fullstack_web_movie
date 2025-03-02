const tmdbService = require('../services/tmdb.service.js');
const User = require('../models/user.model.js');
const UserSearch = require('../models/userSearch.model.js');

const addHistorySearch = async (req, res, response, type) => {
    try {
        if (!req.user._id) {
            return res.status(401).json({ success: false, message: 'User không hợp lệ' });
        }

        const searchHistory = await UserSearch.findOne({ idSearch: response.results[0].id });
        if (searchHistory) {
            await UserSearch.findByIdAndUpdate(searchHistory._id, { updatedAt: new Date() });
            return;
        }
        const resultsSearch = {
            idSearch: response.results[0].id,
            username: req.user.username,
            title: response.results[0].name,
            profile_path: response.results[0].profile_path
                ? response.results[0].profile_path
                : response.results[0].poster_path,
            // response.results[0].backdrop_path
            type: type,
        };
        const userSearch = new UserSearch(resultsSearch);

        await userSearch.save();
    } catch (error) {
        console.log('savedUserSearch error:' + error.message);
    }
};
const addHistorySearchApi = async (req, res) => {
    try {
        const { username, email, title } = req.body;
        const _title = title.trim();
        if (!req.user._id) {
            return res.status(401).json({ success: false, message: 'User không hợp lệ' });
        }
        if (!_title) {
            return res.status(400).json({ success: false, message: 'Title không hợp lệ' });
        }
        const searchHistory = await UserSearch.findOne({ title: _title, email: email ? email : req.user.email });
        if (searchHistory) {
            await UserSearch.findByIdAndUpdate(searchHistory._id, { updatedAt: new Date() });
            return res.status(200).json({ success: true, message: 'Update search history' });
        }
        const resultsSearch = {
            username: req.user.username,
            title: _title,
            email: req.user.email,
        };
        const userSearch = new UserSearch(resultsSearch);

        await userSearch.save();
        return res.status(200).json({ success: true, message: 'Add search history' });
    } catch (error) {
        console.log('savedUserSearch error:' + error.message);
        return res.status(500).json({ success: false, message: 'Add search history err' });
    }
};
const removeHistorySearch = async (req, res) => {
    try {
        const title = req.query.title.trim();
        const email_req = req.query.email;
        const searchHistory = await UserSearch.findOneAndDelete({
            title: title,
            email: email_req ? email_req : req.user.email,
        });
        if (!searchHistory) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy lịch sử tìm kiếm' });
        }
        return res.status(200).json({ success: true, message: 'Xóa lịch sử tìm kiếm thành công' });
    } catch (error) {
        console.log('removeHistorySearch error:' + error.message);
        return res.status(500).json({ success: false, message: 'removeHistorySearch error}' });
    }
};
const searchPerson = async (req, res) => {
    try {
        const person = req.query.person;
        const url = '3/search/person';
        var params = { query: person, include_adult: 'false', language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', params);
        if (response.results.length == 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy kết quả' });
        }
        await addHistorySearch(req, res, response, 'person');

        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching searchPerson:', err.message);

        return res.status(500).json({ success: false, message: 'Call api searchPerson error' });
    }
};

const searchTv = async (req, res) => {
    try {
        const tvParam = req.query.tv;

        const url = `3/search/tv`;
        var params = { query: tvParam, include_adult: 'false', language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', params);
        if (response.results.length == 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy kết quả' });
        }
        await addHistorySearch(req, res, response, 'tv');
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching searchTv:', err.message);

        return res.status(500).json({ success: false, message: 'Call api searchTv error' });
    }
};

const searchMovie = async (req, res) => {
    try {
        const movieParam = req.query.movie;
        const url = '3/search/movie';
        var params = { query: movieParam, include_adult: 'false', language: 'vi-VN', page: '1' };
        const response = await tmdbService(url, 'GET', params);
        if (response.results.length == 0) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy kết quả' });
        }
        await addHistorySearch(req, res, response, 'movie');
        res.status(200).json({ success: true, message: 'success', data: response });
    } catch (err) {
        console.error('Error fetching searchMovie:', err.message);

        return res.status(500).json({ success: false, message: 'Call api searchMovie error' });
    }
};

const getSearchedHistory = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(401).json({ success: false, message: 'email bắt buộc nhập' });
        }
        const user_search = await User.findOne({ email: email });

        if (!user_search) {
            return res.status(400).json({ success: false, message: 'User không hợp lệ' });
        }
        const res_search = await UserSearch.find({ email: email }).sort({ updatedAt: -1 }).limit(10);

        if (res_search) {
            res.status(200).json({ success: true, message: 'success', data: res_search });
        }
    } catch (err) {
        console.error('Error fetching getSearchedHistory:', err.message);
        return res.status(500).json({ success: false, message: 'Call api getSearchedHistory error' });
    }
};

module.exports = { searchPerson, searchTv, searchMovie, removeHistorySearch, getSearchedHistory, addHistorySearchApi };
