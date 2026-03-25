import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pricePerSlot: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
 slots: {
  type: [String],
  default: ["07-09", "09-11", "11-01", "03-05", "05-07"]
}
}, { timestamps: true });

export default mongoose.model("Turf", turfSchema);