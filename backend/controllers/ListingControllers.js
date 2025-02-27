import { TryCatch } from "../middlewares/error.js";

// Listings Controllers
const getUserListings = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User listings retrieved" });
});

const createListing = TryCatch(async (req, res, next) => {
  res.status(201).json({ message: "Listing created successfully" });
});

const updateListing = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Listing updated successfully" });
});

const deleteListing = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Listing deleted successfully" });
});

export { getUserListings, createListing, updateListing, deleteListing };
