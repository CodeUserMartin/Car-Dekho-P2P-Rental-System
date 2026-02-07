import { Car } from "../models/carModel.js";

export const searchCars = async (req, res) => {
    try {
        const {
            location,
            carType,
            fuelType,
            transmission
        } = req.body || {};

        let query = {
            carStatus: "Available"
        };

        if (location) {
            query.carLocation = {
                $regex: location,
                $options: "i"
            };
        }

        if (carType?.length) {
            query.carType = { $in: carType };
        }

        if (fuelType?.length) {
            query.fuelType = { $in: fuelType };
        }

        if (transmission?.length) {
            query.transmission = { $in: transmission };
        }

        console.log("MongoDb Query: ", query);
        

        const cars = await Car.find(query);

        res.json({
            success: true,
            cars
        });

    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
