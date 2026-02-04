import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true
        },
        residingAddress: {
            type: String
        },
        addressProof: {
            type: String   // Cloudinary URL
        },
        panNumber: {
            type: String,
            uppercase: true,
            match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        },
        altPhoneNumber: {
            type: Number
        },
    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema);