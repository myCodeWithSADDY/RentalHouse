import express from "express";
import { getUserListings, createListing, updateListing, deleteListing } from "../controllers/listingController.js";
import { protect } from "../middlewares/auth.js"; // Assuming authentication middleware

const router = express.Router();

router.get("/", protect, getUserListings); // Get user listings
router.post("/", protect, createListing); // Create listing
router.put("/:id", protect, updateListing); // Update listing
router.delete("/:id", protect, deleteListing); // Delete listing

export default router;
