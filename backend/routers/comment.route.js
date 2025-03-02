const express = require('express');
const { addComment, getComment, addReplyComment } = require('../controllers/comment.controller.js');
const protectRoute = require('../middleware/protectRoute.js');
const router = express.Router();

router.post('/add', protectRoute, addComment);
router.post('/reply', protectRoute, addReplyComment);
router.get('/get', getComment); // /get?id_movie=1

module.exports = router;
