import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  description: String,
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema);