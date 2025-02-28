import express from "express";
import { getNotifications, markNotificationRead } from "../controllers/notificationController.js";
import { protect } from "../middlewares/auth.js"; // Auth middleware

const router = express.Router();

router.get("/", protect, getNotifications);
router.put("/:notificationId", protect, markNotificationRead);

export default router;
