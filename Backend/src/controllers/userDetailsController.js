
import { User } from "../models/userModel.js";


export const getUserProfile = async (req, res) => {
    try {
        const clerkUserId = req.auth().userId;

        const user = await User.findOne({ clerkUserId });

        if (!user) {
            return res.json({
                userExists: false
            });
        }

        return res.json({
            userExists: true,
            phoneNumber: user.phoneNumber,
            altPhoneNumber: user.altPhoneNumber,
            panNumber: user.panNumber
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
