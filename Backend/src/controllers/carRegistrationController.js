import { Car } from "../models/carModel.js";
import { User } from "../models/userModel.js";
import { CarRegistration } from "../models/carRegristrationModel.js";
import { cloudinaryUploader } from "../utils/cloudinary.js";
import fs from "fs";

export const registerCar = async (req, res) => {
  try {
    /* 1. AUTH */
    const clerkUserId = req.auth().userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* 2. BODY */
    let {
      residingAddress,
      panNumber,
      altPhoneNumber,
      carDescription,
      carModel,
      carNumber,
      carType,
      fuelType,
      transmission,
      carYear,
      carAvg,
      carPrice,
      carLocation,
      registerBasis
    } = req.body;

    if (
      !residingAddress || !panNumber || !altPhoneNumber ||
      !carModel || !carNumber || !carType ||
      !carPrice || !carLocation || !registerBasis
    ) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    /* EV RULE */
    if (carType === "EV") {
      fuelType = "Electric";
      transmission = "Automatic";
    }

    /* 3. FILES */
    const carImages = req.files?.carImages;
    const addressProofFile = req.files?.addressProof?.[0];

    if (!carImages || carImages.length === 0) {
      return res.status(400).json({ message: "Car images required" });
    }

    if (!addressProofFile) {
      return res.status(400).json({ message: "Address proof required" });
    }

    /* 4. UPLOAD ADDRESS PROOF */
    const addressUpload = await cloudinaryUploader(addressProofFile.path);
    const addressProofUrl = addressUpload.secure_url;
    fs.unlinkSync(addressProofFile.path);

    /* 5. USER */
    let user = await User.findOne({ clerkUserId });
    if (!user) {
      user = await User.create({
        clerkUserId,
        panNumber,
        altPhoneNumber
      });
    }

    /* 6. UPLOAD CAR IMAGES */
    const carImageUrls = [];
    for (const file of carImages) {
      const upload = await cloudinaryUploader(file.path);
      carImageUrls.push(upload.secure_url);
      fs.unlinkSync(file.path);
    }

    /* 7. CAR */
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
      carImages: carImageUrls
    });

    /* 8. REGISTRATION */
    const registration = await CarRegistration.create({
      user: user._id,
      car: car._id,
      residingAddress,
      addressProof: addressProofUrl,
      registerBasis
    });

    return res.status(201).json({
      success: true,
      message: "Car registered successfully",
      data: { car, registration }
    });

  } catch (err) {
    console.error("Register car error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

