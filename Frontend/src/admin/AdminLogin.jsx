import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import API from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Passes the password to backend authController's adminLogin
      // This will set the secure HttpOnly cookie!
      const res = await API.post("/auth/admin-login", { password });
      
      toast.success(res.data.message || "Access Granted. 🛡️");
      
      // Keep purely for fast UI synchronous checks where context isn't available
      localStorage.setItem("arena_admin_auth", "true");
      
      navigate("/admin-dashboard-turf");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid Secret Key. Access Denied. ⛔");
      setPassword(""); // Clear field for retry
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* DECORATIVE BACKGROUND GLOWS (Matching your theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* LOGIN CARD */}
        <div className="bg-[#0f172a]/50 backdrop-blur-2xl border-2 border-dashed border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
          
          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          {/* ICON AREA */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="w-20 h-20 bg-blue-600/10 rounded-3xl border border-blue-500/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <KeyRound className="text-blue-500" size={36} />
            </div>
          </div>

          {/* HEADING SECTION - As requested */}
          <div className="text-center mb-10 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mb-2 block">Restricted Area</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white leading-tight">
              Welcome, <br/>
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Pathan Faizan</span>
            </h2>
            <p className="text-gray-500 mt-3 text-xs md:text-sm font-medium">Please enter your secret access key to proceed.</p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleAdminLogin} className="space-y-6 relative z-10">
            
            {/* Password Field (Single Field as requested) */}
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-3 flex items-center gap-2">
                <ShieldCheck size={12} /> Secret Access Key
              </label>
              <div className="relative group/input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••"
                  className="w-full bg-[#020617]/50 border-2 border-dashed border-white/10 rounded-2xl px-6 py-4.5 text-base md:text-lg focus:outline-none focus:border-blue-500 focus:bg-[#020617] transition-all duration-300 tracking-wider placeholder:tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-5 flex items-center">
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-700 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600/50 group-focus-within/input:text-blue-500 transition-colors hidden xs:block">
                    {/* <Lock size={20} /> */}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button 
              type="submit"
              disabled={isLoading || password.length === 0}
              whileHover={password.length > 0 ? { scale: 1.02 } : {}}
              whileTap={password.length > 0 ? { scale: 0.98 } : {}}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.3em] shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all duration-300 disabled:bg-white/5 disabled:border disabled:border-white/5 disabled:text-gray-700 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying Access...
                </>
              ) : (
                <>
                  Gain Access <ArrowRight size={16} className="xs:inline-block hidden" />
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* FOOTER HINT */}
        <p className="text-center mt-10 text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
           ArenaX Cloud Security • Member Since 2026
        </p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;