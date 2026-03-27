import express from "express";
import { getOwnerStats, getOwnerTurfs } from "../controllers/ownerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 OWNER DASHBOARD STATS
router.get("/stats", protect, getOwnerStats);

// 🔥 OWNER'S TURFS LISTING
router.get("/my-turfs", protect, getOwnerTurfs);

export default router;