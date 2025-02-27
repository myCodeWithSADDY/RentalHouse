// userController.js

import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";

import { sendToken } from "../utils/features.js";
import { uploadFilesToCloudinary } from "../lib/helpers.js";

// Authentication Controllers
const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const profilePicture = req.file;

  if (!profilePicture)
    return next(new ErrorHandler(400, "Profile picture is required"));

  const result = await uploadFilesToCloudinary([profilePicture]);
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };

  const newUser = await User.create({
    name,
    email,
    password,
    role,
    profilePicture: avatar,
  });
  sendToken(res, newUser, 201, "User registered successfully");
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
