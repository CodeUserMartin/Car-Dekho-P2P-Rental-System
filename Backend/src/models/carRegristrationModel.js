import mongoose from "mongoose"


const carRegistrationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        car: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
            required: true
        },

        registerBasis: {
            type: String,
            enum: ["daily", "weekly", "monthly"],
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const carRegistration = mongoose.model("CarRegistration", carRegistrationSchema);