import User from "../models/User.js";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import ActivityLog from "../models/ActivityLog.js";

// Assign a task to a student
export const assignTask = async (req, res) => {
  try {
    const { studentId, title, description, dueDate } = req.body;
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    const task = await Task.create({
      title,
      description,
      assignedTo: studentId,
      assignedBy: req.user.id,
      dueDate
    });
    await User.findByIdAndUpdate(studentId, { $push: { tasks: task._id } });
    res.status(201).json({ message: "Task assigned", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send notification to a student
export const sendNotification = async (req, res) => {
  try {
    const { studentId, message, type } = req.body;
    const student = await User.findById(studentId);
    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }
    const notification = await Notification.create({
      user: studentId,
      message,
      type: type || "info"
    });
    await User.findByIdAndUpdate(studentId, { $push: { notifications: notification._id } });
    res.status(201).json({ message: "Notification sent", notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks assigned by mentor
export const getAssignedTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedBy: req.user.id }).populate("assignedTo", "name email").sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all notifications sent by mentor
export const getSentNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ "user": { $ne: req.user.id }, "createdAt": { $exists: true } }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get mentor's activity logs
export const getMentorActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};