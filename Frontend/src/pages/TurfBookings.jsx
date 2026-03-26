import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowLeft, Ticket, ChevronRight, Activity } from "lucide-react";

function TurfBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      API.get("/bookings")
        .then((res) => {
          setBookings(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
          <Activity className="text-red-500" size={32} />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-widest">Session Expired</h1>
        <p className="text-gray-500 mt-2 text-sm">Please login to view your arena bookings.</p>
        <button onClick={() => navigate("/login")} className="mt-6 bg-blue-600 px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white shadow-lg">Login Now</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
              <Ticket size={14} className="text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase">My History</span>
            </div>
            <h2 className="text-4xl font-black tracking-tighter uppercase">Your <span className="text-blue-500">Bookings</span></h2>
          </div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Total Slots: {bookings.length}</p>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-32 w-full bg-white/5 animate-pulse rounded-3xl border border-white/5" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          /* EMPTY STATE */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f172a]/40 border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-gray-700" size={40} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-gray-300">No Arena Reserved</h3>
            <p className="text-gray-500 mt-2 text-xs font-bold uppercase tracking-widest">Time to get back on the field!</p>
            <Link to="/explore" className="mt-8 inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl shadow-blue-600/10">
              Explore Turfs <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </motion.div>
        ) : (
          /* BOOKINGS LIST */
          <div className="grid gap-4">
            {bookings.map((b, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={b._id}
                className="group relative bg-[#0f172a]/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] hover:border-blue-500/30 transition-all duration-500 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full group-hover:bg-blue-600/10 transition-colors" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* ICON BLOCK */}
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 shrink-0 transform group-hover:scale-110 group-hover:rotate-3 transition-all">
                    <TrophyIcon />
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase group-hover:text-blue-400 transition-colors">
                      {b.turf?.name || "Arena Name"}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4">
                      <span className="flex items-center gap-1.5 text-gray-500">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{b.turf?.location || "Location Unavailable"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* INFO PILLS */}
                <div className="relative z-10 flex flex-col sm:flex-row items-stretch md:items-center gap-3 md:gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="flex-1 flex flex-col bg-black/20 p-3 md:p-4 rounded-2xl border border-white/5 min-w-[120px]">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Calendar size={10} /> Date
                    </span>
                    <span className="text-xs font-black text-white uppercase tracking-tighter">{b.date}</span>
                  </div>
                  <div className="flex-1 flex flex-col bg-black/20 p-3 md:p-4 rounded-2xl border border-white/5 min-w-[120px]">
                    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Clock size={10} /> Time Slot
                    </span>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-tighter">{b.slot}</span>
                  </div>
                  <div className="hidden md:block pl-2">
                    <ChevronRight size={20} className="text-gray-700 group-hover:text-white transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple Trophy Icon Helper
function TrophyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
      <path d="M4 22h16"></path>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
    </svg>
  );
}

export default TurfBookings;