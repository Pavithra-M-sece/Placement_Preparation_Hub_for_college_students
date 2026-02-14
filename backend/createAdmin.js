import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const existingAdmin = await User.findOne({ email: "admin@campushire.com" });
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    const admin = await User.create({
      name: "Admin User",
      email: "admin@campushire.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin user created successfully!");
    console.log("Email: admin@campushire.com");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

createAdmin();
