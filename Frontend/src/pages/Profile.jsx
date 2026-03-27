import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Edit, Calendar, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  if (!user) return <div className="h-screen flex items-center justify-center text-gray-500 bg-[#020617]">Loading...</div>;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully! 👋");
    navigate("/");
  };

  return (
    <div className="min-h-full pt-30 flex items-start justify-center px-4 sm:px-6 py-8 relative overflow-hidden bg-[#020617]">
      
      {/* DECORATIVE BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md md:max-w-lg"
      >
        {/* PROFILE CARD */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
          
          {/* TOP SECTION: AVATAR */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-25"></div>
              <div className="relative w-24 h-24 bg-[#0f172a] border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-black text-white">
                  {user.name[0].toUpperCase()}
                </span>
              </div>
            </div>
            
            <h2 className="mt-4 text-2xl md:text-3xl font-black tracking-tight text-white uppercase text-center">
              {user.name}
            </h2>
            <span className="px-4 py-1 mt-2 text-[10px] font-black uppercase tracking-[0.2em] bg-blue-500/10 text-blue-400 border border-blue-500/10 rounded-full">
              {user.role || "Member"}
            </span>
          </div>

          {/* INFO SECTION */}
          <div className="space-y-3 md:space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Email Address</p>
              <p className="text-gray-200 font-bold text-sm md:text-base break-all">{user.email}</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-black mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <p className="text-gray-200 font-bold text-sm uppercase tracking-widest">Active</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-8 md:mt-10 space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <button className="py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/my-bookings")}
                className="py-3.5 rounded-2xl bg-blue-600 text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 text-white"
              >
                My Bookings
              </button>
            </div>

            {/* LOGOUT BUTTON */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full py-4 rounded-2xl bg-red-500/10 border border-red-500/10 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Logout Account
            </button>
          </div>
        </div>

        {/* FOOTER HINT */}
        <p className="text-center mt-8 text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          ArenaX Premium Member
        </p>
      </motion.div>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-4">
                <LogOut className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Logout?</h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-8">Are you sure you want to exit?</p>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="py-4 rounded-2xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;