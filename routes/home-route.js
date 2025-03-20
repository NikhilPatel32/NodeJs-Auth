const express = require("express");
const router = express.Router();
const authMiddleWare = require('../middlewares/auth-middleware');
router.get('/welcome' , authMiddleWare ,(req , res) => {
    const {username , userId , role} = req.userInfo;
res.json({
    message : "Welcome to Home page",
    user : {
      username : username,
      user_id : userId,
      role : role
    }
})
})

module.exports = router