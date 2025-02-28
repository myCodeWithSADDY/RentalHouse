import {KYC} from "../models/KYC.js";
import { TryCatch } from "../middlewares/error.js";

// Upload KYC document
const uploadKYC = TryCatch(async (req, res, next) => {
  const { documentType, documentURL } = req.body;
  const userId = req.user.id;

  const existingKYC = await KYC.findOne({ user: userId });
  if (existingKYC) return res.status(400).json({ success: false, message: "KYC already submitted" });

  const kyc = await KYC.create({ user: userId, documentType, documentURL });
  res.status(201).json({ success: true, message: "KYC document uploaded", kyc });
});

// Get KYC status for a user
const getKYCStatus = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const kyc = await KYC.findOne({ user: userId });

  if (!kyc) return res.status(404).json({ success: false, message: "No KYC record found" });

  res.status(200).json({ success: true, kyc });
});

// Admin verifies KYC
const verifyKYC = TryCatch(async (req, res, next) => {
  const { userId, status } = req.body; // Only Admin can update status

  if (!["Pending", "Verified", "Rejected"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid KYC status" });
  }

  const updatedKYC = await KYC.findOneAndUpdate({ user: userId }, { status }, { new: true });

  if (!updatedKYC) return res.status(404).json({ success: false, message: "KYC record not found" });

  res.status(200).json({ success: true, message: "KYC status updated", kyc: updatedKYC });
});

export { uploadKYC, getKYCStatus, verifyKYC };
