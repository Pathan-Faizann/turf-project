import Booking from "../models/Booking.js";
import Turf from "../models/Turf.js";

// 📅 Get Booked Slots (for UI)
export const getBookedSlots = async (req, res) => {
  try {
    const { turfId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date required" });
    }

    const bookings = await Booking.find({ turf: turfId, date });

    const bookedSlots = bookings.map(b => b.slot);

    res.json(bookedSlots);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👤 Get User Bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("turf", "name location")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👑 Get All Bookings for Owner
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("user", "name email")
      .populate("turf", "name location")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🛑 Create Booking
export const createBooking = async (req, res) => {
  try {
    const { turfId, date, slot } = req.body;

    if (!turfId || !date || !slot) {
      return res.status(400).json({ message: "All fields required" });
    }

    // ❌ Already booked check
    const exists = await Booking.findOne({
      turf: turfId,
      date,
      slot
    });

    if (exists) {
      return res.status(400).json({ message: "Slot already booked ❌" });
    }

    const turf = await Turf.findById(turfId);

    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      user: req.user._id,
      turf: turfId,
      owner: turf.owner, // 🔥 important for owner dashboard
      date,
      slot,
      price: turf.pricePerSlot
    });

    res.status(201).json({
      message: "Booking successful 🔥",
      booking
    });

  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};