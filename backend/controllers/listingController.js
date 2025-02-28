import {Listing} from "../models/listing.js";
import { TryCatch } from "../middlewares/error.js";

// Get Listings for a Specific User
const getUserListings = TryCatch(async (req, res, next) => {
  const userId = req.user.id; 
  const listings = await Listing.find({ owner: userId });
  res.status(200).json({ success: true, listings });
});

// Create a New Listing
const createListing = TryCatch(async (req, res, next) => {
  const { title, description, price, location, images } = req.body;
  const newListing = await Listing.create({
    title,
    description,
    price,
    location,
    images,
    owner: req.user.id, 
  });
  res.status(201).json({ success: true, listing: newListing });
});

// Update an Existing Listing
const updateListing = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedListing) return res.status(404).json({ success: false, message: "Listing not found" });
  res.status(200).json({ success: true, listing: updatedListing });
});

// Delete a Listing
const deleteListing = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) return res.status(404).json({ success: false, message: "Listing not found" });
  res.status(200).json({ success: true, message: "Listing deleted successfully" });
});

export { getUserListings, createListing, updateListing, deleteListing };
