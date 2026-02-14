import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  createMentor,
  createStudent,
  createDrive,
  assignMentor,
  getAllStudents,
  getAllMentors,
  getAnalytics,
  getAllDrives
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/create-mentor", protect, allowRoles("admin"), createMentor);
router.post("/create-student", protect, allowRoles("admin"), createStudent);
router.post("/create-drive", protect, allowRoles("admin"), createDrive);
router.post("/assign-mentor", protect, allowRoles("admin"), assignMentor);
router.get("/students", protect, allowRoles("admin"), getAllStudents);
router.get("/mentors", protect, allowRoles("admin"), getAllMentors);
router.get("/analytics", protect, allowRoles("admin"), getAnalytics);
router.get("/drives", protect, allowRoles("admin"), getAllDrives);

export default router;
