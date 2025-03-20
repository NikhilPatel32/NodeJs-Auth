const express = require("express");
const router = express.Router();
const authMiddleWare = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/auth-admin-middleware');

router.get('/welcome' , authMiddleWare , adminMiddleware , (req , res) => {
    const {username , userId , role} = req.userInfo;
res.json({
    message : "Welcome to Admin page",
    user : {
      username : username,
      user_id : userId,
      role : role
    }
})
})

module.exports = router