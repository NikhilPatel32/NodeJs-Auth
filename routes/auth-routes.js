const express = require('express');
const {
    registerUser,
    loginUser
} = require('../controllers/auth-controller');
//create router
const router = express.Router();

//all routes are related user authentication and authorisation

router.post('/register' , registerUser);
router.post('/login' , loginUser);

module.exports = router;