import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  broadcastNotification,
  getSystemLogs,
  getDepartmentAnalytics,
  removeUser,
  changeUserRole
} from "../controllers/adminFeatureController.js";

const router = express.Router();

router.post("/broadcast", protect, allowRoles("admin"), broadcastNotification);
router.get("/system-logs", protect, allowRoles("admin"), getSystemLogs);
router.get("/department-analytics", protect, allowRoles("admin"), getDepartmentAnalytics);
router.post("/remove-user", protect, allowRoles("admin"), removeUser);
router.post("/change-role", protect, allowRoles("admin"), changeUserRole);

export default router;