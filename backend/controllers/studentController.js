import User from "../models/User.js";
import Drive from "../models/Drive.js";
import Application from "../models/Application.js";

export const updateProfile = async (req, res) => {
  try {
    const { cgpa, skills, mockAverage, codingCount, resumeScore } = req.body;

    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (cgpa !== undefined) student.cgpa = cgpa;
    if (skills !== undefined) student.skills = skills;
    if (mockAverage !== undefined) student.mockAverage = mockAverage;
    if (codingCount !== undefined) student.codingCount = codingCount;
    if (resumeScore !== undefined) student.resumeScore = resumeScore;

    await student.save();

    res.json({
      message: "Profile updated successfully",
      student: {
        id: student._id,
        name: student.name,
        cgpa: student.cgpa,
        skills: student.skills,
        mockAverage: student.mockAverage,
        codingCount: student.codingCount,
        resumeScore: student.resumeScore
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReadinessScore = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
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

export const getEligibleDrives = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const drives = await Drive.find();

    const eligibleDrives = drives.filter(drive => {
      const cgpaMatch = student.cgpa >= drive.minCgpa;
      const skillsMatch = drive.requiredSkills.every(skill =>
        student.skills.includes(skill)
      );
      return cgpaMatch && skillsMatch;
    });

    res.json(eligibleDrives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const applyForDrive = async (req, res) => {
  try {
    const { driveId } = req.body;

    const drive = await Drive.findById(driveId);
    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }

    const student = await User.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const cgpaMatch = student.cgpa >= drive.minCgpa;
    const skillsMatch = drive.requiredSkills.every(skill =>
      student.skills.includes(skill)
    );

    if (!cgpaMatch || !skillsMatch) {
      return res.status(400).json({ message: "You are not eligible for this drive" });
    }

    const existingApplication = await Application.findOne({
      student: req.user.id,
      drive: driveId
    });

    if (existingApplication) {
      return res.status(400).json({ message: "Already applied for this drive" });
    }

    const application = await Application.create({
      student: req.user.id,
      drive: driveId
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student: req.user.id })
      .populate("drive")
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMentor = async (req, res) => {
  try {
    const student = await User.findById(req.user.id).populate("mentor", "name email");
    if (!student || !student.mentor) {
      return res.status(404).json({ message: "No mentor assigned" });
    }

    res.json(student.mentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
