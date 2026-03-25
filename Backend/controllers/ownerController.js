import Turf from "../models/Turf.js";
import Booking from "../models/Booking.js";

export const getOwnerStats = async (req, res) => {
  try {
    // 1. Check karein ki middleware se req.user._id mil raha hai
    const ownerId = req.user._id; 

    // Total Turfs (Ensure schema field is 'owner')
    const totalTurfs = await Turf.countDocuments({ owner: ownerId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Bookings Today
    const bookingsToday = await Booking.countDocuments({
      owner: ownerId, // Booking model mein bhi owner ID honi chahiye
      createdAt: { $gte: today }
    });

    // Total Revenue using Aggregation (Fastest way)
    const revenueData = await Booking.aggregate([
      { $match: { owner: ownerId } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    const revenue = revenueData.length > 0 ? revenueData[0].total : 0;

    res.json({
      totalTurfs,
      bookingsToday,
      revenue
    });

  } catch (err) {
    console.error("Stats Error:", err); // Error log check karein terminal pe
    res.status(500).json({ message: "Error fetching stats" });
  }
};