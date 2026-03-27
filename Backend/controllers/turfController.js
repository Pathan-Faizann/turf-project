import Turf from "../models/Turf.js";

// ➕ Add Turf (Owner only)
export const addTurf = async (req, res) => {
  try {
    const { name, location, pricePerSlot, slots } = req.body;

    // Debugging ke liye: Check karo req.user mil raha hai ya nahi
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, no user found" });
    }

    const turf = await Turf.create({
      name,
      location,
      pricePerSlot,
      owner: req.user._id, // Use _id (MongoDB standard)
      slots: slots || undefined // Agar body mein slots hain toh wo, nahi toh default lega
    });

    res.status(201).json(turf);
  } catch (error) {
    console.error("Add Turf Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// 📃 Get All Turfs
export const getTurfs = async (req, res) => {
  try {
    const turfs = await Turf.find().populate("owner", "name email");
    res.json(turfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧑‍🌾 Get Owner's Own Turfs (for /owner/turfs)
export const getOwnerTurfs = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const turfs = await Turf.find({ owner: req.user._id })
      .populate("owner", "name email");

    res.json(turfs);
  } catch (error) {
    console.error("GET OWNER TURFS ERROR:", error); // 🔥 ADD THIS
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get Single Turf
export const getTurfById = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    res.json(turf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);

    if (!turf) {
      return res.status(404).json({ message: "Turf not found" });
    }

    // 🔥 SAFE OWNER CHECK
    if (!turf.owner) {
      return res.status(400).json({ message: "Turf has no owner" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (turf.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await turf.deleteOne(); // 🔥 better than findByIdAndDelete

    res.json({ message: "Turf deleted successfully 🔥" });

  } catch (err) {
    console.error("Delete Error:", err); // 👈 IMPORTANT
    res.status(500).json({ message: err.message });
  }
};