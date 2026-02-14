import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  assignTask,
  sendNotification,
  getAssignedTasks,
  getSentNotifications,
  getMentorActivityLogs
} from "../controllers/mentorFeatureController.js";

const router = express.Router();

router.post("/assign-task", protect, allowRoles("mentor"), assignTask);
router.post("/send-notification", protect, allowRoles("mentor"), sendNotification);
router.get("/assigned-tasks", protect, allowRoles("mentor"), getAssignedTasks);
router.get("/sent-notifications", protect, allowRoles("mentor"), getSentNotifications);
router.get("/activity-logs", protect, allowRoles("mentor"), getMentorActivityLogs);

export default router;