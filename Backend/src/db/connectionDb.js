import mongoose from "mongoose"
import { Db_name } from "../constants.js"
import "dotenv/config"

async function connectDb() {

    try {
        let connection = await mongoose.connect(`${process.env.MONGO_DB_URL}/${Db_name}`);
        console.log(`Connection to DB Success!!`);        
    } catch (error) {
        console.error("Error connection to the DB", error);
        process.exit(1);
    }
}

export default connectDb;