import mongoose from "mongoose"


const carSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        carModel: {
            type: String,
            required: true
        },

        carNumber: {
            type: String,
            required: true,
            unique: true
        },

        carDescription: {
            type: String
        },
        carType: {
            type: String,
            enum: ["SUV", "Sedan", "Hatchback", "Luxury", "EV"], // SUV, Sedan, Hatchback, Luxury, Ev
            required: true
        },

        fuelType: {
            type: String,
            enum: ["Petrol", "Diesel", "Electric", "CNG"],
            required: true
        },

        transmission: {
            type: String,
            enum: ["Manual", "Automatic"],
            required: true
        },

        carYear: {
            type: Number,
            min: 1990,
            max: new Date().getFullYear()
        },

        carAvg: {
            type: Number // mileage
        },

        carPrice: {
            type: Number, // price per day
            required: true
        },
        carImages: {
            type: [String], // Cloudinary URLs
            required: true
        },
        // carRating: {
        //     type: String
        // },
        carLocation: {
            type: String,
            required: true
        },
        carStatus: {
            type: String,
            enum: ["available", "booked"], // Booked or available
            default: "available"
        }
    },
    {
        timestamps: true
    }
)


export const Car = mongoose.model("Car", carSchema)