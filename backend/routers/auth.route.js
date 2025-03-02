const express = require('express');
const {
    register,
    login,
    logout,
    authCheck,
    getUser,
    updateUser,
    deleteUser,
    changePassword,
} = require('../controllers/auth.controller.js');
const protectRoute = require('../middleware/protectRoute.js');
const router = express.Router();

router.post('/login', login);

router.get('/logout', logout);

router.post('/register', register);
router.get('/check', protectRoute, authCheck);
router.get('/getall', protectRoute, getUser);

router.delete('/delete', protectRoute, deleteUser);
router.put('/update', protectRoute, updateUser);
router.put('/change-pw', protectRoute, changePassword);
module.exports = router;
