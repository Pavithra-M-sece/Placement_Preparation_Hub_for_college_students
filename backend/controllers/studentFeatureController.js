import User from "../models/User.js";
import Project from "../models/Project.js";
import Notification from "../models/Notification.js";
import Task from "../models/Task.js";
import ActivityLog from "../models/ActivityLog.js";

// Project upload
export const uploadProject = async (req, res) => {
  try {
    const { title, description, fileUrl } = req.body;
    const project = await Project.create({
      student: req.user.id,
      title,
      description,
      fileUrl
    });
    await User.findByIdAndUpdate(req.user.id, { $push: { projects: project._id } });
    res.status(201).json({ message: "Project uploaded", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ student: req.user.id }).sort({ uploadedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Resume upload (just a URL for now)
export const uploadResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { resumeUrl }, { new: true });
    res.json({ message: "Resume uploaded", resumeUrl: user.resumeUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Attendance update
export const updateAttendance = async (req, res) => {
  try {
    const { attendance } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { attendance }, { new: true });
    res.json({ message: "Attendance updated", attendance: user.attendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark notification as read
export const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.body;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: taskId, assignedTo: req.user.id },
      { status },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List activity logs
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};