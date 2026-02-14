import mongoose from "mongoose";

const driveSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  minCgpa: {
    type: Number,
    required: true
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  deadline: {
    type: Date,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Drive", driveSchema);
