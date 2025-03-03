import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], 
      default: "pending"
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model("Listing", ListingSchema);

