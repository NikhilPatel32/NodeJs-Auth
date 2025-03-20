const { uploadToCloudinary } = require('../helpers/cloudinary-helpers');
const image = require('../models/image');

const uploadImage = async(req , res) => {
   try{
     //check if file is missing in req object
     if(!req.file){
        return res.status(400).json({
            success : false,
            message : 'File is required. Please upload an image'
        })
     }
    
     // upload to Cloudinary
     const {url , publicId} = await uploadToCloudinary(req.file.path);

     //store image url , public Id along with user Id in database
     const newlyUploadedImage = new image({
        url,
        publicId,
        uploadedBy : req.userInfo.userId,
     })

     await newlyUploadedImage.save();

     res.status(201).json({
        success : true,
        message : 'Image uploaded successfully',
        image : newlyUploadedImage,
     })

   }catch(error){
    console.log(error);
    res.status(400).json({
        success : false,
        message : "something went wrong! Please try again"
    })
   }
}

module.exports = {
    uploadImage
}