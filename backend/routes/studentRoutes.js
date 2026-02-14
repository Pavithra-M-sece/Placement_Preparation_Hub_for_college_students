import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  updateProfile,
  getReadinessScore,
  getEligibleDrives,
  applyForDrive,
  getMyApplications,
  getMentor
} from "../controllers/studentController.js";

const router = express.Router();

router.put("/profile", protect, allowRoles("student"), updateProfile);
router.get("/readiness", protect, allowRoles("student"), getReadinessScore);
router.get("/eligible-drives", protect, allowRoles("student"), getEligibleDrives);
router.post("/apply", protect, allowRoles("student"), applyForDrive);
router.get("/applications", protect, allowRoles("student"), getMyApplications);
router.get("/mentor", protect, allowRoles("student"), getMentor);

export default router;
