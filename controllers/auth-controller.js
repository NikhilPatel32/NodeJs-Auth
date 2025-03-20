const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller
const registerUser = async(req , res) => {
    try{
     //extract user information from form data
     const {username , email , phone , password , role} = req.body;

     //check if username or email exists
     const isUserExistAlready = await User.findOne({
        $or : [{username} , {email}]  //ckeck for email and user if they exist
    });

    if(isUserExistAlready){
        return res.status(400).json({
            success : false,
            message : "User already exists! Try with different username and email"
        })
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user and save in database
    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        role : role || 'user',
    })
    await newUser.save();

    if(newUser){
        res.status(201).json({
            success : true,
            message : "User registered succesfully"
        })
    }else{
        res.status(400).json({
            success : false,
            message : "Unable to register please try again",
        })
    }
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false ,
            message : "some error occured! Please try again",
        })
    }
}

//login controller 
const loginUser = async(req , res) => {
    try{
     const {username , password} = req.body;

     //find if the current user exist in databse or not
     const user = await User.findOne({username});

     if(!user){
       return res.status(400).json({
            success : false,
            message : "User does not exist"
        })
     }

     //checking password
     const passwordMatch = await bcrypt.compare(password , user.password);

     if(!passwordMatch){
       return res.status(400).json({
           success : false,
           message : "Invalid login credentials"
        })
    }

    //create user token
    const accessToken = jwt.sign({
        userId : user._id,
        username : user.username,
        role : user.role
    } , process.env.JWT_SECRET_KEY , {
        expiresIn : '15m',
    }) 

    res.status(200).json({
        success : true,
        message : "LoggedIn successfully",
        accessToken
    })
     }
catch(e){
        console.log(e);
        res.status(500).json({
            success : false ,
            message : "some error occured! Please try again",
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}