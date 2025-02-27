// userController.js
import { TryCatch } from "../middlewares/error";
import ErrorHandler from "../utils/errorHandler";

// Authentication Controllers
const registerUser = TryCatch(async (req, res, next) => {
  if (!user) return next(new ErrorHandler(404, "User not found"));
  res.status(201).json({ message: "User registered successfully" });
});

const loginUser = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User logged in successfully" });
});

const getMe = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User profile data" });
});

const updateUser = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User profile updated" });
});

const deleteUser = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "User deleted successfully" });
});

const forgotPassword = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Password reset link sent" });
});

const resetPassword = TryCatch(async (req, res, next) => {
  res.status(200).json({ message: "Password reset successfully" });
});

export {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
};
