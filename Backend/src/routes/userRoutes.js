import { Router } from "express"
import { registerCar } from "../controllers/carRegistrationController.js";
import { upload } from "../middleware/multerMiddleware.js";
import { requireAuth } from "@clerk/express";

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


router.get("/auth-test", requireAuth(), (req, res) => {
  res.json({
    success: true,
    userId: req.auth.userId
  });
});




export default router;