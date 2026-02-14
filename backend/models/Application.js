import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  drive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drive",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected", "selected"],
    default: "pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Application", applicationSchema);
