import express from "express";
import { getAllUsers, getAllTurfs, deleteTurf, getAllBookings, getAllContactMessages } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

// Apply strict HttpOnly Cookie JWT verification to ALL admin routes below
router.use(adminAuth);

// @desc    Get all users grouped by players and owners
// @route   GET /api/admin/users
// @access  Public (frontend AdminLogin handles access via static password for now)
router.get("/users", getAllUsers);

// Turf Management
router.get("/turfs", getAllTurfs);
router.delete("/turfs/:id", deleteTurf);

// Booking Management
router.get("/bookings", getAllBookings);

// Contact Messages
router.get("/contacts", getAllContactMessages);

export default router;
