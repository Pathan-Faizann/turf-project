import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar as CalIcon, Clock, CheckCircle2, AlertCircle, ArrowLeft, Trophy } from "lucide-react";

function TurfDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [turf, setTurf] = useState(null);
  const [date, setDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Turf Data
  useEffect(() => {
    API.get(`/turfs/${id}`).then(res => setTurf(res.data));
  }, [id]);

  // Fetch Booked Slots for Selected Date
  useEffect(() => {
    if (date) {
      API.get(`/bookings/${id}?date=${date}`).then(res => setBookedSlots(res.data));
    }
  }, [date, id]);

  const handleBooking = async () => {
    if (!selectedSlot || !date) {
      return toast.error("Please select both Date & Slot! 📅");
    }

    setLoading(true);
    try {
      await API.post("/bookings", { turfId: id, date, slot: selectedSlot });
      toast.success("Arena Reserved Successfully! 🔥");
      setBookedSlots(prev => [...prev, selectedSlot]);
      setSelectedSlot("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="text-red-500 mb-4" size={48} />
        <h1 className="text-2xl font-black text-white uppercase tracking-widest">Access Denied</h1>
        <p className="text-gray-500 mt-2 text-sm">You need to be logged in to book a turf.</p>
        <button onClick={() => navigate("/login")} className="mt-6 bg-blue-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg shadow-blue-600/20">Login Now</button>
      </div>
    );
  }

  if (!turf) return (
    <div className="h-screen bg-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-12 px-4 md:px-8 relative overflow-x-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* BACK BUTTON */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Explore</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: TURF INFO & DATE SELECTION */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl">
              <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20 text-blue-400">
                <Trophy size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight leading-tight">{turf.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mt-3 group">
                <MapPin size={16} className="text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-widest leading-relaxed">{turf.location}</span>
              </div>
              
              <div className="mt-10 space-y-4">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block ml-1">Select Booking Date</label>
                <div className="relative group">
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-white text-sm outline-none focus:border-blue-500/50 transition-all cursor-pointer"
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <CalIcon className="absolute right-4 top-4 text-gray-600 group-focus-within:text-blue-500" size={18} />
                </div>
              </div>
            </motion.div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/5 p-5 rounded-[2rem] text-center">
                  <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Price</span>
                  <span className="text-xl font-black text-emerald-400">₹{turf.pricePerSlot}</span>
               </div>
               <div className="bg-white/5 border border-white/5 p-5 rounded-[2rem] text-center">
                  <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Duration</span>
                  <span className="text-xl font-black text-blue-400">60 Min</span>
               </div>
            </div>
          </div>

          {/* RIGHT: SLOTS SELECTION */}
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0f172a]/40 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-widest">Available <span className="text-blue-500">Slots</span></h3>
                  <p className="text-gray-500 text-[10px] font-bold mt-1 uppercase tracking-widest">Click on a time to reserve</p>
                </div>
                <Clock className="text-gray-700" size={24} />
              </div>

              {!date ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-white/5 rounded-[2rem]">
                   <CalIcon size={40} className="text-gray-800 mb-4" />
                   <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">First, choose a date to see availability</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {turf.slots.map((slot, i) => {
                    const isBooked = bookedSlots.includes(slot);
                    const isSelected = selectedSlot === slot;

                    return (
                      <motion.button
                        whileHover={!isBooked ? { scale: 1.02 } : {}}
                        whileTap={!isBooked ? { scale: 0.98 } : {}}
                        key={i}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                        className={`relative p-4 rounded-2xl text-[11px] font-black tracking-widest transition-all duration-300 border ${
                          isBooked 
                            ? "bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed opacity-50"
                            : isSelected
                            ? "bg-blue-600 border-blue-500 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)]"
                            : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {slot}
                        {isBooked && <span className="absolute top-1 right-2 text-[8px] uppercase">Booked</span>}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* BOOKING ACTION */}
              <div className="mt-auto pt-10">
                <button
                  disabled={!selectedSlot || loading}
                  onClick={handleBooking}
                  className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all duration-500 shadow-2xl ${
                    !selectedSlot || loading
                    ? "bg-white/5 text-gray-700 cursor-not-allowed border border-white/5"
                    : "bg-white text-black hover:bg-blue-600 hover:text-white shadow-blue-600/20"
                  }`}
                >
                  {loading ? "Processing..." : (
                    <>
                      Confirm Booking <CheckCircle2 size={18} />
                    </>
                  )}
                </button>
                <p className="text-center text-[9px] text-gray-600 mt-6 font-bold uppercase tracking-widest">By booking, you agree to ArenaX Terms & Conditions</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TurfDetails;