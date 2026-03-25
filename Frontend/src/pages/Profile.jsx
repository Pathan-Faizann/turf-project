import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <div className="h-screen flex items-center justify-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* DECORATIVE BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* PROFILE CARD */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden">
          
          {/* TOP SECTION: AVATAR */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-24 h-24 bg-[#0f172a] border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-black bg-gradient-to-br from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  {user.name[0].toUpperCase()}
                </span>
              </div>
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-[#020617] rounded-full shadow-sm"></div>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">{user.name}</h2>
            <span className="px-3 py-1 mt-1 text-[10px] font-bold uppercase tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
              {user.role || "Member"}
            </span>
          </div>

          {/* INFO SECTION */}
          <div className="space-y-4">
            <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Email Address</p>
              <p className="text-gray-200 font-medium">{user.email}</p>
            </div>

            <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <p className="text-gray-200 font-medium italic">Active</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <button className="py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all active:scale-95">
              Edit Profile
            </button>
            <button className="py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-sm font-bold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all active:scale-95">
              My Bookings
            </button>
          </div>
        </div>

        {/* FOOTER HINT */}
        <p className="text-center mt-6 text-gray-600 text-xs tracking-wide">
          Member since March 2026 • ArenaX Premium
        </p>
      </motion.div>
    </div>
  );
}

export default Profile;