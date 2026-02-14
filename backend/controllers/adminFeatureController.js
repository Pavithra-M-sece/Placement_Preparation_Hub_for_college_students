import User from "../models/User.js";
import Notification from "../models/Notification.js";
import ActivityLog from "../models/ActivityLog.js";

// Broadcast notification to all users or by role/department
export const broadcastNotification = async (req, res) => {
  try {
    const { message, type, role, department } = req.body;
    let filter = {};
    if (role) filter.role = role;
    if (department) filter.department = department;
    const users = await User.find(filter);
    const notifications = await Promise.all(users.map(async (user) => {
      return Notification.create({
        user: user._id,
        message,
        type: type || "info"
      });
    }));
    res.status(201).json({ message: `Broadcast sent to ${users.length} users`, notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all system logs (activity logs)
export const getSystemLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("user", "name email role").sort({ createdAt: -1 }).limit(200);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Department performance analytics (students, mentors, placement rate by department)
export const getDepartmentAnalytics = async (req, res) => {
  try {
    const students = await User.aggregate([
      { $match: { role: "student" } },
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);
    const mentors = await User.aggregate([
      { $match: { role: "mentor" } },
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);
    // Placement rate by department (dummy: count of students for now)
    res.json({ students, mentors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add/remove user (soft delete)
export const removeUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User removed", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change user role
export const changeUserRole = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};