import { v2 as cloudinary } from "cloudinary"
import "dotenv/config"
import fs from "fs"


// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const cloudinaryUploader = async (localFilePath) => {

    // LocalFilePath -- file saved temporary on the server
    try {
        if (!localFilePath) return null;

        // Upload file on cloudinary
        let result = await cloudinary.uploader.upload
            (localFilePath, {
                resource_type: "auto"
            })

        // File upload success
        console.log("File succesfully uploaded: ", result.url);

        // remove local file after successful upload
        // fs.unlinkSync(localFilePath);
        return result;

    } catch (error) {

        // remove local file if upload fails
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.error("File upload action failed!!", error);
        return null;
    }
}



export { cloudinaryUploader }