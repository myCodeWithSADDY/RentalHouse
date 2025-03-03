import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; 

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) return res.status(401).json({ message: "Unauthorized access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const user = await User.findById(decoded.id);

    if (!user && user.role !== "admin") {
      return res.status(403).json({ message: "Access Denied! Admins Only" });
    }

    req.user = user; 
    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export {isAdmin}
