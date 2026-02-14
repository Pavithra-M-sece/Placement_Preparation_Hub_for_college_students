import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";
import studentFeatureRoutes from "./routes/studentFeatureRoutes.js";
import mentorFeatureRoutes from "./routes/mentorFeatureRoutes.js";
import adminFeatureRoutes from "./routes/adminFeatureRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/drives", driveRoutes);
app.use("/api/student-features", studentFeatureRoutes);
app.use("/api/mentor-features", mentorFeatureRoutes);
app.use("/api/admin-features", adminFeatureRoutes);

app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`🌐 Backend API: http://localhost:${PORT}/api\n`);
});

connectDB();
