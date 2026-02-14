import User from "../models/User.js";
import MentorAssignment from "../models/MentorAssignment.js";
import MockResult from "../models/MockResult.js";

export const getAssignedStudents = async (req, res) => {
  try {
    const students = await User.find({ mentor: req.user.id, role: "student" })
      .select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentReadiness = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const readinessScore =
      (student.cgpa * 10) * 0.3 +
      student.mockAverage * 0.3 +
      (student.codingCount * 2) * 0.2 +
      student.resumeScore * 0.2;

    const readiness = Math.min(100, Math.round(readinessScore));

    res.json({
      studentId: student._id,
      name: student.name,
      cgpa: student.cgpa,
      mockAverage: student.mockAverage,
      codingCount: student.codingCount,
      resumeScore: student.resumeScore,
      readinessScore: readiness
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRemarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { remarks } = req.body;

    const student = await User.findById(studentId);
    if (!student || student.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    student.mentorRemarks = remarks;
    await student.save();

    const assignment = await MentorAssignment.findOne({
      mentor: req.user.id,
      student: studentId
    });

    if (assignment) {
      assignment.remarks = remarks;
      await assignment.save();
    }

    res.json({ message: "Remarks added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addImprovementPlan = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { improvementPlan } = req.body;

    const student = await User.findById(studentId);
    if (!student || student.mentor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const assignment = await MentorAssignment.findOne({
      mentor: req.user.id,
      student: studentId
    });

    if (assignment) {
      assignment.improvementPlan = improvementPlan;
      await assignment.save();
    }

    res.json({ message: "Improvement plan added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentMockResults = async (req, res) => {
  try {
    const { studentId } = req.params;

    const mockResults = await MockResult.find({ student: studentId }).sort({ date: -1 });
    res.json(mockResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
