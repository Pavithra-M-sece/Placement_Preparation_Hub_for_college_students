import mongoose from "mongoose";

const mockResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  testName: String,
  score: Number,
  maxScore: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("MockResult", mockResultSchema);
