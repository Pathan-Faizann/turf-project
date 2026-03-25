import express from "express";
import { getOwnerStats } from "../controllers/ownerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 OWNER DASHBOARD STATS
router.get("/stats", protect, getOwnerStats);

export default router;