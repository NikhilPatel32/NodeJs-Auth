const cloudinary = require('../config/cloudinary-config');

const uploadToCloudinary = async(filePath) => {
try{
    //Upload an image
    const result = await cloudinary.uploader.upload(filePath);

    return {
        url  : result.url,
        publicId : result.public_id,
    }
}catch(error){
    console.error('Error while uploading to cloudinary' , error);
    throw new Error('Error while uploading to cloudinary');
}
}

module.exports = {
    uploadToCloudinary 
}