const mongoose = require("mongoose");

const connectToDB = async() => {
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
    }catch(error){
        console.log(error);
        console.log("MongoDb failed to connect");
        process.exit(1);
    }
}

module.exports = connectToDB;