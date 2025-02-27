// userRoutes.js
import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers.js";
import {
  addFavorite,
  createListing,
  deleteListing,
} from "../controllers/ListingControllers.js";
import {
  addFavorite,
  addReview,
  deleteReview,
  getFavorites,
  getUserReviews,
  removeFavorite,
} from "../controllers/Favorites&Reviews.js";
import {
  getNotifications,
  markNotificationRead,
} from "../controllers/Notifications.js";
import { protect } from "../middlewares/authMiddleware.js";
// Authentication Routes
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", protect, getMe);

// User Profile Routes
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

// Listings Routes
router.get("/:id/listings", protect, getUserListings);
router.post("/:id/listings", protect, createListing);
router.put("/:id/listings/:listingId", protect, updateListing);
router.delete("/:id/listings/:listingId", protect, deleteListing);

// Favorites Routes
router.post("/:id/favorites/:listingId", protect, addFavorite);
router.get("/:id/favorites", protect, getFavorites);
router.delete("/:id/favorites/:listingId", protect, removeFavorite);

// Reviews Routes
router.post("/:id/reviews", protect, addReview);
router.get("/:id/reviews", protect, getUserReviews);
router.delete("/:id/reviews/:reviewId", protect, deleteReview);

// Password Management
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

// Notifications
router.get("/:id/notifications", protect, getNotifications);
router.put("/:id/notifications/:notificationId", protect, markNotificationRead);

// KYC Verification Routes
router.post("/kyc/upload", protect, (req, res) => {
  res.send("Upload KYC Document");
});
router.get("/kyc/status", protect, (req, res) => {
  res.send("Get KYC Status");
});
router.post("/kyc/verify", protect, (req, res) => {
  res.send("Admin Approves/Rejects KYC");
});

module.exports = router;
