import {Review} from "../models/Review.js";
import { TryCatch } from "../middlewares/error.js";

// Add a review to a listing
const addReview = TryCatch(async (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: Please log in to submit a review" });
  }

  const { listingId, rating, comment } = req.body;
  const userId = req.user.id;

  if (!listingId || !rating || !comment) {
    return res.status(400).json({ success: false, message: "Listing ID, rating, and comment are required" });
  }

  const listing = await Listing.findById(listingId);
  if (!listing) {
    return res.status(404).json({ success: false, message: "Listing not found" });
  }

  const existingReview = await Review.findOne({ user: userId, listing: listingId });
  if (existingReview) {
    return res.status(400).json({ success: false, message: "You have already reviewed this listing" });
  }

  const review = await Review.create({ user: userId, listing: listingId, rating, comment });

  res.status(201).json({ success: true, message: "Review added successfully", review });
});


// Get reviews by a specific user
const getUserReviews = TryCatch(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized: Please log in to view your reviews" });
  }

  const userId = req.user.id;

  const reviews = await Review.find({ user: userId })
    .populate("listing", "title location price"); // Only fetch necessary fields

  if (!reviews.length) {
    return res.status(404).json({ success: false, message: "No reviews found for this user" });
  }
  res.status(200).json({ success: true, reviews });
});


// Delete a review
const deleteReview = TryCatch(async (req, res, next) => {
  const { reviewId } = req.params;
  const deletedReview = await Review.findOneAndDelete({ _id: reviewId, user: req.user.id });

  if (!deletedReview) return res.status(404).json({ success: false, message: "Review not found" });

  res.status(200).json({ success: true, message: "Review deleted successfully" });
});

export { addReview, getUserReviews, deleteReview };
