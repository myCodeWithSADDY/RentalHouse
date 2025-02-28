import express from "express";
import { uploadKYC, getKYCStatus, verifyKYC } from "../controllers/kycController.js";
import { protect } from "../middlewares/auth.js"; 

const router = express.Router();

router.post("/", protect, uploadKYC);
router.get("/", protect, getKYCStatus);
router.put("/verify", protect, verifyKYC); 

export default router;
