
const jwt = require("jsonwebtoken");

const authMiddleWare = (req , res , next) => {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1]; //get first element after space
    console.log(token);
    if(!token){
        return res.status(401).json({
            success : false,
            message : "login to continue"
        })
    }

    //decode this token
    try{
    const decodedUserInfo = jwt.verify(token , process.env.JWT_SECRET_KEY);
    console.log(decodedUserInfo);

    //store user information in req
    req.userInfo = decodedUserInfo;
    next();
    }catch(error){
        console.log(error);
        return res.status(501).json({
            success : false,
            message : "error in fetching details"
        }) 
    }
}

module.exports = authMiddleWare;