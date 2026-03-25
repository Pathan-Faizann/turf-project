import express from "express";
import { createBooking, getBookedSlots, getUserBookings, getOwnerBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create booking
router.post("/", protect, createBooking);

// get user bookings
router.get("/", protect, getUserBookings);

// get owner bookings
router.get("/owner", protect, getOwnerBookings);

// get booked slots
router.get("/:turfId", getBookedSlots);

export default router;