import {Listing} from "../models/listing.js";
import { TryCatch } from "../middlewares/error.js";
import { uploadFilesToCloudinary } from "../lib/helpers.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get Listings for a Specific User
const getUserListings = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const listings = await Listing.find({ owner: userId })
    .skip(skip)
    .limit(limit);

  if (!listings.length) {
    return res.status(200).json({ success: true, message: "No listings found", listings: [] });
  }

  res.status(200).json({ success: true, page, listings });
});

const createListing = TryCatch(async (req, res, next) => { 
  console.log("🔹 Received Headers:", req.headers);
  console.log("🔹 Received Request Body:", req.body);
  console.log("🔹 Received Files:", req.file || req.files);

  if (!req.user) {
    return next(new ErrorHandler(401, "Unauthorized: Please login to create a listing"));
  }

  const { title, description, price, location } = req.body;
  const image = req.file; // Get uploaded image

  if (!title || !description || !price || !location) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  if (!image) {
    return next(new ErrorHandler(400, "At least one image is required"));
  }

  // Upload file to Cloudinary (ensure your function works)
  const uploadedImage = await uploadFilesToCloudinary(image);

  const newListing = await Listing.create({
    title,
    description,
    price,
    location,
    images: [{ public_id: uploadedImage.public_id, url: uploadedImage.url }],
    owner: req.user.id,
  });

  res.status(201).json({ success: true, listing: newListing });
});



// Create a New Listing
/*
const createListing = TryCatch(async (req, res, next) => { 

  if (!req.user) {
    return next(new ErrorHandler(401, "Unauthorized: Please login to create a listing"));
  }

  const { title, description, price, location } = req.body;
  const images = req.files; 
  
  if (!title || !description || !price || !location) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  if (!images || images.length === 0) {
    return next(new ErrorHandler(400, "At least one image is required"));
  }

  const uploadedImages = await uploadFilesToCloudinary(images);

  const imageArray = uploadedImages.map(img => ({
    public_id: img.public_id,
    url: img.url,
  }));

  const newListing = await Listing.create({
    title,
    description,
    price,
    location,
    images: imageArray,
    owner: req.user.id, // Owner is the logged-in user
  });

  res.status(201).json({ success: true, listing: newListing });
});
*/
// Update an Existing Listing
const updateListing = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

  // Ensure only the owner can update
  if (listing.owner.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: "Not authorized to update this listing" });
  }

  let updatedData = { ...req.body };

  // Handle image updates 
  if (req.files && req.files.length > 0) {
    const uploadedImages = await uploadFilesToCloudinary(req.files);
    updatedData.images = uploadedImages.map(img => ({
      public_id: img.public_id,
      url: img.url,
    }));
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

  res.status(200).json({ success: true, listing: updatedListing });
});


// Delete a Listing
const deleteListing = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  
  const listing = await Listing.findById(id);
  if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

  if (listing.owner.toString() !== req.user.id) {
    return res.status(403).json({ success: false, message: "Not authorized to delete this listing" });
  }

  // Delete images from Cloudinary 
  if (listing.images && listing.images.length > 0) {
    await Promise.all(listing.images.map(img => cloudinary.uploader.destroy(img.public_id)));
  }
  await Listing.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Listing deleted successfully" });
});


export { getUserListings, createListing, updateListing, deleteListing };
