import mongoose from "mongoose";

const KYCSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    documentType: { type: String, required: true }, // e.g., Passport, ID Card, etc.
    documentURL: { type: String, required: true }, // Cloud storage link
    status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

const KYC = mongoose.model("KYC", KYCSchema);
export default KYC;
