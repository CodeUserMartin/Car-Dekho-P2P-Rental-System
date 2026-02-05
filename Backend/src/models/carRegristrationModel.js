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
        residingAddress: {
            type: String,
            required: true
        },
        addressProof: {
            type: String,
            required: true
        },
        registerBasis: {
            type: String,
            enum: ["Weekly", "Monthly", "Yearly"],
            required: true
        }
    },
    {
        timestamps: true
    }
)


export const CarRegistration = mongoose.model("CarRegistration", carRegistrationSchema);