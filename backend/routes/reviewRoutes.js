import express from "express";
import { addReview, getUserReviews, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", protect, getUserReviews);
router.post("/", protect, addReview);
router.delete("/:reviewId", protect, deleteReview);

export default router;
