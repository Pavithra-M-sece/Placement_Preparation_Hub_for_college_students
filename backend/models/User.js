import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "mentor", "student"],
    default: "student"
  },
  department: {
    type: String,
    default: ""
  },
  attendance: {
    type: Number,
    default: 0 // percentage
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  }],
  resumeUrl: {
    type: String,
    default: ""
  },
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification"
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }],
  activityLogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ActivityLog"
  }],
  cgpa: {
    type: Number,
    default: 0
  },
  skills: {
    type: [String],
    default: []
  },
  mockAverage: {
    type: Number,
    default: 0
  },
  codingCount: {
    type: Number,
    default: 0
  },
  resumeScore: {
    type: Number,
    default: 0
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  mentorRemarks: String
}, { timestamps: true });

export default mongoose.model("User", userSchema);
