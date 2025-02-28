import {Favorite} from "../models/Favorite.js";
import { TryCatch } from "../middlewares/error.js";

// Add a listing to favorites
const addFavorite = TryCatch(async (req, res, next) => {
  const { listingId } = req.body;
  const userId = req.user.id; 

  const existingFavorite = await Favorite.findOne({ user: userId, listing: listingId });
  if (existingFavorite) return res.status(400).json({ success: false, message: "Already in favorites" });

  const favorite = await Favorite.create({ user: userId, listing: listingId });
  res.status(201).json({ success: true, message: "Listing added to favorites", favorite });
});

// Get user's favorite listings
const getFavorites = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const favorites = await Favorite.find({ user: userId }).populate("listing");
  res.status(200).json({ success: true, favorites });
});

// Remove a listing from favorites
const removeFavorite = TryCatch(async (req, res, next) => {
  const { listingId } = req.params;
  const userId = req.user.id;

  const deletedFavorite = await Favorite.findOneAndDelete({ user: userId, listing: listingId });
  if (!deletedFavorite) return res.status(404).json({ success: false, message: "Favorite not found" });

  res.status(200).json({ success: true, message: "Listing removed from favorites" });
});

export { addFavorite, getFavorites, removeFavorite };
