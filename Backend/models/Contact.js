import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: null
  },
  purpose: {
    type: String,
    required: true,
    enum: ["General Enquiry", "Booking Issue", "Feedback"]
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "resolved", "in-progress"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);