import express from "express";
import { getUserListings, createListing, updateListing, deleteListing } from "../controllers/listingController.js";
import { protect } from "../middlewares/auth.js"; // Assuming authentication middleware
import { uploadMultiple } from "../utils/multer.js";

const router = express.Router();

router.get("/", protect, getUserListings); // Get user listings
router.post("/create", protect, uploadMultiple ,createListing); // Create listing
router.put("/:id", protect, updateListing); // Update listing
router.delete("/:id", protect, deleteListing); // Delete listing

export default router;
