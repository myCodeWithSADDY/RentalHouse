import {Favorite} from "../models/Favorite.js";
import { TryCatch } from "../middlewares/error.js";

// Add a listing to favorites
const addFavorite = TryCatch(async (req, res, next) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please log in" });
    }

    const { listingId } = req.body;
    const userId = req.user.id;

    if (!listingId) {
      return res.status(400).json({ success: false, message: "Listing ID is required" });
    }

    const existingFavorite = await Favorite.findOne({ user: userId, listing: listingId });
    if (existingFavorite) {
      return res.status(400).json({ success: false, message: "Already in favorites" });
    }

    const favorite = await Favorite.create({ user: userId, listing: listingId });

    res.status(201).json({ 
      success: true, 
      message: "Listing added to favorites", 
      favorite 
    });

  } catch (error) {
    console.error("Add Favorite Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


const getFavorites = TryCatch(async (req, res, next) => {
  try {

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please log in" });
    }

    const userId = req.user.id;

    const favorites = await Favorite.find({ user: userId }).populate("listing");

    if (!favorites.length) {
      return res.status(404).json({ success: false, message: "No favorite listings found" });
    }

    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error("Get Favorites Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

const removeFavorite = TryCatch(async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Please log in" });
    }

    const { listingId } = req.params;
    const userId = req.user.id;

    if (!listingId) {
      return res.status(400).json({ success: false, message: "Listing ID is required" });
    }
    const deletedFavorite = await Favorite.findOneAndDelete({ user: userId, listing: listingId });

    if (!deletedFavorite) {
      return res.status(404).json({ success: false, message: "Favorite not found" });
    }

    res.status(200).json({ success: true, message: "Listing removed from favorites" });
  } catch (error) {
    console.error("Remove Favorite Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { addFavorite, getFavorites, removeFavorite };
