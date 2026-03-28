import User from "../models/User.js";
import Turf from "../models/Turf.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";

// @desc    Get all users and owners for Admin Dashboard
// @route   GET /api/admin/users
// @access  Public (temporarily, since AdminLogin is frontend-only)
export const getAllUsers = async (req, res) => {
  try {
    // 1. Fetch all users excluding passwords, sorted by newest first
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    // 2. Separate into players
    const players = users.filter((u) => u.role === "user");

    // 3. Separate into owners
    const ownersBase = users.filter((u) => u.role === "owner");

    // 4. Fetch all turfs to count how many turfs each owner has
    const turfs = await Turf.find();

    const owners = ownersBase.map((owner) => {
      // Find turfs belonging to this owner
      const ownerTurfsCount = turfs.filter(
        (t) => t.owner && t.owner.toString() === owner._id.toString()
      ).length;

      return {
        ...owner.toObject(),
        turfsCount: ownerTurfsCount, // Add turf count to owner object
      };
    });

    // 5. Send structured response matching frontend expectations
    res.json({ players, owners });
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ message: "Server Error while fetching users", error: error.message });
  }
};

// @desc    Get all turfs for Admin Dashboard
// @route   GET /api/admin/turfs
// @access  Public (temporarily)
export const getAllTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find().populate("owner", "name email").sort({ createdAt: -1 });
    res.json(turfs);
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a turf securely via Admin
// @route   DELETE /api/admin/turfs/:id
// @access  Public (temporarily)
export const deleteTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    await turf.deleteOne();

    res.json({ message: "Turf forcibly deleted by Admin" });
  } catch (error) {
    console.error("Error deleting turf:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all bookings for Admin Dashboard
// @route   GET /api/admin/bookings
// @access  Public (temporarily)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("turf", "name location")
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all contact messages for Admin Dashboard
// @route   GET /api/admin/contacts
// @access  Public (temporarily)
export const getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
