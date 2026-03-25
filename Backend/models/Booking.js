import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    turf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Turf",
      required: true
    },

    owner: {   // 🔥 IMPORTANT
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    date: {
      type: String,
      required: true
    },

    slot: {
      type: String,
      required: true
    },

    price: {   // 💰 revenue ke liye
      type: Number,
      required: true
    },

    status: {   // future use
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);