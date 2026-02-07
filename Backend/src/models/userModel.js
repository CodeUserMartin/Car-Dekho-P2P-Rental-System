import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true
        },
        panNumber: {
            type: String,
            uppercase: true,
            match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
        },
        phoneNumber: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"]
        },
        altPhoneNumber: {
            type: String,
            required: true,
            match: [/^[0-9]{10}$/, "Alternate phone number must be exactly 10 digits"]
        }
    },
    {
        timestamps: true
    }
)


export const User = mongoose.model("User", userSchema);