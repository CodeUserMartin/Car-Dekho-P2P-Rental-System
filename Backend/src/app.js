import express from "express"
import cors from "cors"
import "dotenv/config"
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/userRoutes.js"



const app = express();


// App config
app.use(cors({ origin: process.env.CROSS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(clerkMiddleware());

// Import routes



// Declare Routes
app.use("/api/v1/user", userRoutes);



export { app }