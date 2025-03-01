import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; // Ensure correct path
import  ErrorHandler  from "../utils/errorHandler.js"; // Ensure correct path

export const protect = TryCatch(async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler(401, "Not authorized, no token"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next(new ErrorHandler(401, "User not found"));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler(401, "Not authorized, token failed"));
  }
});
