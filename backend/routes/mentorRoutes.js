import express from "express";
import { protect, allowRoles } from "../middleware/auth.js";
import {
  getAssignedStudents,
  getStudentReadiness,
  addRemarks,
  addImprovementPlan,
  getStudentMockResults
} from "../controllers/mentorController.js";

const router = express.Router();

router.get("/assigned-students", protect, allowRoles("mentor"), getAssignedStudents);
router.get("/student/:studentId/readiness", protect, allowRoles("mentor"), getStudentReadiness);
router.post("/student/:studentId/remarks", protect, allowRoles("mentor"), addRemarks);
router.post("/student/:studentId/improvement-plan", protect, allowRoles("mentor"), addImprovementPlan);
router.get("/student/:studentId/mock-results", protect, allowRoles("mentor"), getStudentMockResults);

export default router;
