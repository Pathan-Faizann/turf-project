import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MapPin, Trophy, IndianRupee, Rocket, ArrowLeft, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddTurf() {
  const [form, setForm] = useState({ name: "", location: "", pricePerSlot: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/turfs", form);
      toast.success("Turf Added Successfully! 🏟️");
      navigate("/owner"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding turf ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    // h-screen aur overflow-hidden se scroll band ho jayega
    <div className="h-full w-full bg-[#020617] flex flex-col justify-center items-center p-4 md:p-8 overflow-hidden relative">
      
      {/* PRE-RENDERED AMBIENT LIGHTS */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />

      

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* HEADER SECTION */}
          <div className="mb-8 text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-5 border border-blue-500/30">
              <Target className="text-blue-400" size={28} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight leading-none">
              List Your <span className="text-blue-500 italic">Turf</span>
            </h2>
            <p className="text-gray-500 mt-3 text-xs font-medium tracking-wide">
              Fill in the arena details to start accepting bookings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TURF NAME */}
            <div className="group">
              <div className="flex justify-between mb-2 px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Arena Name</label>
              </div>
              <div className="relative">
                <input
                  required
                  placeholder="e.g. Dream Arena"
                  className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Trophy className="absolute right-4 top-4 text-gray-700 group-focus-within:text-blue-500/60 transition-colors" size={18} />
              </div>
            </div>

            {/* LOCATION */}
            <div className="group">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 px-1">Location</label>
              <div className="relative">
                <input
                  required
                  placeholder="Near Railway Station..."
                  className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
                <MapPin className="absolute right-4 top-4 text-gray-700 group-focus-within:text-blue-500/60 transition-colors" size={18} />
              </div>
            </div>

            {/* PRICE */}
            <div className="group">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2 px-1">Price / Slot</label>
              <div className="relative">
                <input
                  required
                  type="number"
                  placeholder="Amount in ₹"
                  className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, pricePerSlot: e.target.value })}
                />
                <IndianRupee className="absolute right-4 top-4 text-gray-700 group-focus-within:text-emerald-500/60 transition-colors" size={18} />
              </div>
            </div>

            {/* SPACER */}
            <div className="pt-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all duration-500 ${
                  loading 
                  ? "bg-white/5 text-gray-600 cursor-wait" 
                  : "bg-white text-black hover:bg-blue-500 hover:text-white shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                }`}
              >
                {loading ? "Publishing..." : (
                  <>
                    Confirm Listing <Rocket size={16} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

        
        </div>
      </motion.div>
    </div>
  );
}

export default AddTurf;