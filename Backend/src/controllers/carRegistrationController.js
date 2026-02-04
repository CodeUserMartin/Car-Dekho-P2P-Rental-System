import { Car } from "../models/carModel.js";
import { User } from "../models/userModel.js";
import { cloudinaryUploader } from "../utils/cloudinary.js";
import fs from "fs";

export const registerCar = async (req, res) => {
    try {

        //    1. AUTH CHECK
        
        const clerkUserId = req.auth().userId;

        console.log("User is :", clerkUserId);


        if (!clerkUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        //    2. FIND OR CREATE USER
        
        let user = await User.findOne({ clerkUserId });

        if (!user) {
            user = await User.create({
                clerkUserId
            });
        }


        //    3. EXTRACT BODY DATA
        
        const {
            carModel,
            carNumber,
            carDescription,
            carType,
            fuelType,
            transmission,
            carYear,
            carAvg,
            carPrice,
            carLocation
        } = req.body;

        if (!carModel || !carNumber || !carType || !fuelType || !transmission || !carPrice || !carLocation) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        
        // 4. HANDLE FILES
      
        if (!req.files || !req.files.carImages) {
            return res.status(400).json({
                success: false,
                message: "Car images are required"
            });
        }

        const carImages = req.files.carImages;
        const uploadedImageUrls = [];

        for (const file of carImages) {
            const uploadResult = await cloudinaryUploader(file.path);

            if (uploadResult?.secure_url) {
                uploadedImageUrls.push(uploadResult.secure_url);
            }

            // cleanup local file
            fs.unlinkSync(file.path);
        }

        
        //    5. CREATE CAR
      
        const car = await Car.create({
            user: user._id,
            carModel,
            carNumber,
            carDescription,
            carType,
            fuelType,
            transmission,
            carYear,
            carAvg,
            carPrice,
            carLocation,
            carImages: uploadedImageUrls
        });

        
        //    6. RESPONSE
      
        return res.status(201).json({
            success: true,
            message: "Car registered successfully",
            data: car
        });

    } catch (error) {
        console.error("Register car error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
