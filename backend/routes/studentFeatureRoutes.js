import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  uploadProject,
  getProjects,
  uploadResume,
  updateAttendance,
  getNotifications,
  markNotificationRead,
  getTasks,
  updateTaskStatus,
  getActivityLogs
} from "../controllers/studentFeatureController.js";

const router = express.Router();

router.post("/project", protect, allowRoles("student"), uploadProject);
router.get("/projects", protect, allowRoles("student"), getProjects);
router.post("/resume", protect, allowRoles("student"), uploadResume);
router.post("/attendance", protect, allowRoles("student"), updateAttendance);
router.get("/notifications", protect, allowRoles("student"), getNotifications);
router.post("/notification/read", protect, allowRoles("student"), markNotificationRead);
router.get("/tasks", protect, allowRoles("student"), getTasks);
router.post("/task/status", protect, allowRoles("student"), updateTaskStatus);
router.get("/activity-logs", protect, allowRoles("student"), getActivityLogs);

export default router;