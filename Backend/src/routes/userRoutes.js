import { Router } from "express"
import { registerCar } from "../controllers/carRegistrationController.js";
import { getUserProfile } from "../controllers/UserDetailsController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { requireAuth } from "@clerk/express";
import { getMyCars } from "../controllers/carController.js";
import { searchCars } from "../controllers/searchControllers.js";

const router = Router();

// console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY)
router.post(
  "/register-car",
  requireAuth(),
  upload.fields([
    { name: "carImages", maxCount: 4 },
    { name: "addressProof", maxCount: 1 }
  ]), // fix typo maxCount
  registerCar
);

router.get("/profile",
  requireAuth(),
  getUserProfile)

router.get("/my-cars", getMyCars);

router.post("/search", searchCars);


export default router;