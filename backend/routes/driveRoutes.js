import express from "express";
import Drive from "../models/Drive.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const drives = await Drive.find().sort({ deadline: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ message: "Drive not found" });
    }
    res.json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
