import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to user (expires in 10 minutes)
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - TurfBooker',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #020617;">Password Reset Request</h2>
          <p>Hello ${user.name},</p>
          <p>You requested a password reset for your TurfBooker account.</p>
          <div style="background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: #020617; margin: 0;">Your OTP Code</h3>
            <p style="font-size: 24px; font-weight: bold; color: #020617; margin: 10px 0;">${otp}</p>
            <p style="color: #666; margin: 0;">Valid for 10 minutes</p>
          </div>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>TurfBooker Team</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to your email" });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP
    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (!user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ----------------------------------------------------
// ADMIN AUTHENTICATION (HTTP-ONLY COOKIES)
// ----------------------------------------------------

export const adminLogin = async (req, res) => {
  try {
    const { password } = req.body;
    
    // Fallback to "saleha" if env var is missing
    const validPassword = process.env.ADMIN_PASSWORD || "saleha";

    if (password !== validPassword) {
      return res.status(401).json({ message: "Invalid Admin Password. Access Denied." });
    }

    // Sign a specific admin token
    const token = jwt.sign(
      { id: "admin_user", role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set HTTP-Only Cookie
    res.cookie("admin_token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "none", 
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.json({ message: "Admin authenticated securely", role: "admin" });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

export const adminLogout = (req, res) => {
  res.cookie("admin_token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0) // Expire immediately
  });
  res.json({ message: "Admin logged out successfully" });
};

export const adminCheck = (req, res) => {
  // If request simply reaches here, the adminAuth middleware approved the cookie
  res.json({ ok: true, message: "Valid admin session" });
};