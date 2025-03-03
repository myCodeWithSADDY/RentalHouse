import express from "express";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { getAllUsers, approveListing, removeListing, manageKYC } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", isAdmin, getAllUsers);

router.put("/listings/:id/approve", isAdmin, approveListing);

router.delete("/listings/:id/remove", isAdmin, removeListing);

router.put("/kyc/:id/verify", isAdmin, manageKYC);

export default router;
