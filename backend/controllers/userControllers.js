// userController.js
import {User} from "../models/user.js";
import { TryCatch , errorMiddleware} from "../middlewares/error.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { uploadFilesToCloudinary } from "../lib/helpers.js";
import { sendEmail } from "../utils/sendEmail.js";



// Register User
const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const profilePicture = req.file;

  if (!name || !email || !password) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler(400, "User already exists"));
  }

  let avatar = null;

  // Upload image only if provided
  if (profilePicture) {
    const result = await uploadFilesToCloudinary([profilePicture]);
    avatar = {
      public_id: result[0].public_id,
      url: result[0].url,
    };
  }

  user = await User.create({
    name,
    email,
    password,
    role,
    profilePicture: avatar, 
  });

  const token = user.getJWT();

  res.status(201).json({ success: true, token, user });
});

// Login User
const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorHandler(400, "Please enter email & password"));

  const user = await User.findOne({ email }).select("+password");
  console.log("Stored Hashed Password:", user.password); 
  
  if (!user) return next(new ErrorHandler(404, "Invalid email or password"));

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorHandler(401, "Invalid email or password"));

  const token = user.getJWT();
  res.status(200).json({ success: true, token, user });
});

// Get Logged-in User
const getMe = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// Update User
const updateUser = TryCatch(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
  res.status(200).json({ success: true, message: "Profile updated", user });
});

// Delete User
const deleteUser = TryCatch(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

// Forgot Password
const forgotPassword = TryCatch(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler(404, "User not found"));

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Click the link below to reset your password (valid for 15 minutes): \n\n${resetUrl}`,
    });

    res.status(200).json({ success: true, message: "Password reset link sent" });
  } catch (error) {
    return next(new ErrorHandler(500, "Email could not be sent"));
  }
});



const resetPassword = TryCatch(async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return next(new ErrorHandler(400, "All fields are required"));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler(404, "User not found"));

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return next(new ErrorHandler(400, "Old password is incorrect"));

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne({ email }, { password: hashedPassword });

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(500, error.message || "Internal Server Error"));
  }
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

