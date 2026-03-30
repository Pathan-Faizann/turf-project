import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import turfRoutes from "./routes/turfRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import ownerRoutes from "./routes/ownerRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Force redeploy trigger
dotenv.config();
connectDB();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",   // local frontend (Vite)
  "http://localhost:5000",   // agar use ho
  "https://turf-project-bice.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/turfs", turfRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/owner", ownerRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});