const express = require('express');
const {
    searchPerson,
    searchTv,
    searchMovie,
    removeHistorySearch,
    getSearchedHistory,
    addHistorySearchApi,
} = require('../controllers/search.controller.js');
const router = express.Router();

router.get('/person', searchPerson);
router.get('/tv', searchTv);
router.get('/movie', searchMovie);
router.post('/add', addHistorySearchApi);
router.get('/get', getSearchedHistory); // /get search history all or by type /get?type=movie
router.delete('/remove', removeHistorySearch); // /remove?id=

module.exports = router;
