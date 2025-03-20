
const authMiddleWare = require('./auth-middleware');
const adminMiddleware = (req , res , next) => {

    if(req.userInfo.role !== 'admin'){
        return res.status(500).json({
            success : false,
            message : "Access denied! Only Admin can access it"
        })
    }

    next();
}

module.exports = adminMiddleware;