import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword, adminLogin, adminLogout, adminCheck } from "../controllers/authController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ADMIN ROUTES
router.post("/admin-login", adminLogin);
router.post("/admin-logout", adminLogout);
router.get("/admin-check", adminAuth, adminCheck);

export default router;