import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Drive from "../models/Drive.js";
import Application from "../models/Application.js";
import MentorAssignment from "../models/MentorAssignment.js";

export const createMentor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const mentor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "mentor"
    });

    res.status(201).json({
      id: mentor._id,
      name: mentor.name,
      email: mentor.email,
      role: mentor.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, cgpa, skills } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      cgpa,
      skills
    });

    res.status(201).json({
      id: student._id,
      name: student.name,
      email: student.email,
      role: student.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDrive = async (req, res) => {
  try {
    const { companyName, minCgpa, requiredSkills, deadline } = req.body;

    const drive = await Drive.create({
      companyName,
      minCgpa,
      requiredSkills,
      deadline
    });

    res.status(201).json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const assignMentor = async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;

    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const mentor = await User.findById(mentorId);
    if (!mentor || mentor.role !== "mentor") {
      return res.status(404).json({ message: "Mentor not found" });
    }

    student.mentor = mentorId;
    await student.save();

    await MentorAssignment.create({
      mentor: mentorId,
      student: studentId
    });

    res.json({ message: "Mentor assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .populate("mentor", "name email");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await User.find({ role: "mentor" }).select("-password");
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalMentors = await User.countDocuments({ role: "mentor" });
    const totalDrives = await Drive.countDocuments();
    const totalApplications = await Application.countDocuments();

    const applicationsByStatus = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalStudents,
      totalMentors,
      totalDrives,
      totalApplications,
      applicationsByStatus
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllDrives = async (req, res) => {
  try {
    const drives = await Drive.find().sort({ deadline: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
