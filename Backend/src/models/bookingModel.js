import mongoose from "mongoose"


const bookingSchema = new mongoose.Schema(
    {
        carRegistration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CarRegistration",
            required: true
        },

        startDateTime: {
            type: Date,
            required: true
        },

        endDateTime: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value > this.startDateTime;
                },
                message: "End date must be after start date"
            }
        },

        bookingStatus: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending"
        },

        location: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Booking = mongoose.model("Booking", bookingSchema);