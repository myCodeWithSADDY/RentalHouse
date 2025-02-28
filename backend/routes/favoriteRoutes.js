import express from "express";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoriteController.js";
import { protect } from "../middlewares/auth.js"; // Authentication middleware

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/:listingId", protect, removeFavorite);

export default router;
