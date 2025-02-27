import { TryCatch } from "../middlewares/error";

// Notifications Controllers
const getNotifications = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Notifications retrieved" });
});

const markNotificationRead = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Notification marked as read" });
});

// KYC Verification Controllers
const uploadKYC = TryCatch(async (req, res, next) => {
  res.status(201).json({ message: "KYC document uploaded" });
});

const getKYCStatus = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "KYC status retrieved" });
});

const verifyKYC = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "KYC verified successfully" });
});

export {
  getNotifications,
  markNotificationRead,
  uploadKYC,
  getKYCStatus,
  verifyKYC,
};
