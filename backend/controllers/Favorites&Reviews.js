import { TryCatch } from "../middlewares/error.js";

// Favorites Controllers
const addFavorite = TryCatch(async (req, res, next) => {
  res.status(201).json({ message: "Listing added to favorites" });
});

const getFavorites = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User favorites retrieved" });
});

const removeFavorite = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Listing removed from favorites" });
});

// Reviews Controllers
const addReview = TryCatch(async (req, res, next) => {
  res.status(201).json({ message: "Review added successfully" });
});

const getUserReviews = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User reviews retrieved" });
});

const deleteReview = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Review deleted successfully" });
});

export {
  addFavorite,
  getFavorites,
  removeFavorite,
  addReview,
  getUserReviews,
  deleteReview,
};
