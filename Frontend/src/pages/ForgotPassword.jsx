import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email! 📧");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await API.post("/auth/reset-password", {
        email,
        otp,
        newPassword
      });
      toast.success("Password reset successful! 🎉");
      // Redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#020617] text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md border border-white/10"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {otpSent ? "Reset Password" : "Forgot Password"}
          </h2>
          <p className="text-gray-400">
            {otpSent
              ? "Enter the OTP sent to your email"
              : "Enter your email to receive reset code"
            }
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none backdrop-blur-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none backdrop-blur-md text-center text-2xl font-mono"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="New password"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none backdrop-blur-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-4 bg-white/5 border border-white/10 rounded-xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none backdrop-blur-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 transform active:scale-95 transition-all"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;