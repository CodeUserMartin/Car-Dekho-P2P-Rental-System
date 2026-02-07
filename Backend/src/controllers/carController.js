import { User } from "../models/userModel.js";
import { CarRegistration } from "../models/carRegristrationModel.js";

export const getMyCars = async (req, res) => {
    try {
        // 🔐 Auth check
        const clerkUserId = req.auth().userId;


        if (!clerkUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        // 👤 Find user
        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.json({
                success: true,
                cars: []
            });
        }

        // 🚗 Get all registrations with car data
        const registrations = await CarRegistration
            .find({ user: user._id })
            .populate("car");

        // 🎯 Extract only car objects
        const cars = registrations
            .map(reg => reg.car)
            .filter(Boolean);

        return res.json({
            success: true,
            cars
        });


    } catch (error) {
        console.error("Get my cars error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
};
