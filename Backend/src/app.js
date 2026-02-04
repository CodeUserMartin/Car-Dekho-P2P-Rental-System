import express from "express"
import cors from "cors"
import "dotenv/config"


const app = express();


// App config
app.use(cors());
app.use(express.json());




export { app }