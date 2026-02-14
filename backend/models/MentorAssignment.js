import mongoose from "mongoose";

const mentorAssignmentSchema = new mongoose.Schema({
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedAt: {
    type: Date,
    default: Date.now
  },
  remarks: String,
  improvementPlan: String
});

export default mongoose.model("MentorAssignment", mentorAssignmentSchema);
