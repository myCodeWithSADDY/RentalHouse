import {Notification} from "../models/Notification.js";
import { TryCatch } from "../middlewares/error.js";

// Get all notifications for a user
const getNotifications = TryCatch(async (req, res, next) => {
  const userId = req.user.id;
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, notifications });
});

// Mark a notification as read
const markNotificationRead = TryCatch(async (req, res, next) => {
  const { notificationId } = req.params;
  const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });

  if (!notification) return res.status(404).json({ success: false, message: "Notification not found" });

  res.status(200).json({ success: true, message: "Notification marked as read", notification });
});

export { getNotifications, markNotificationRead };
