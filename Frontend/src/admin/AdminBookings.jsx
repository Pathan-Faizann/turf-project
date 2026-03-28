import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, ShieldAlert, Clock, IndianRupee, MapPin, User, CheckCircle } from "lucide-react";
import API from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings on load
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/admin/bookings");
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-transparent text-white pt-8 pb-12 px-4 md:px-10 lg:px-12 relative overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="mb-10 shrink-0 border-b border-white/5 pb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
          Platform Activity
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase relative z-10">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Bookings</span>
        </h1>
        <p className="text-gray-500 text-xs md:text-sm font-bold mt-2 max-w-2xl leading-relaxed">
          Monitor all turf reservations happening across the entire platform in real-time. Review player bookings and schedule slots globally.
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
          <CalendarCheck size={48} className="text-gray-600 mb-4" />
          <p className="text-xl font-bold uppercase tracking-widest text-gray-500">No Bookings Found</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            <AnimatePresence>
              {bookings.map((booking) => (
                <motion.div
                  layout
                  key={booking._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-emerald-500/20 transition-all duration-300 shadow-2xl group flex flex-col"
                >
                  <div className="p-6 md:p-8 flex-1 flex flex-col gap-6">
                    {/* Top Row: Date & Status */}
                    <div className="flex justify-between items-center bg-black/20 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-500/20 text-blue-400 p-2 rounded-xl">
                          <CalendarCheck size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Date</p>
                          <p className="font-bold text-sm tracking-wide">{booking.date}</p>
                        </div>
                      </div>
                      
                      {booking.status === "booked" ? (
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">Confirmed</span>
                         </div>
                      ) : (
                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                            <ShieldAlert size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest pt-0.5">Cancelled</span>
                         </div>
                      )}
                    </div>

                    {/* Main Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       
                       {/* Turf Info */}
                       <div className="space-y-4">
                          <div className="flex items-start gap-3 text-sm">
                            <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Arena</p>
                               <p className="font-black tracking-wide text-white">{booking.turf?.name || "Deleted Turf"}</p>
                               <p className="text-xs text-gray-400 mt-1 truncate max-w-[150px]">{booking.turf?.location || "Unknown"}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 text-sm">
                            <Clock size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Time Slot</p>
                               <p className="font-bold text-gray-300">{booking.slot}</p>
                            </div>
                          </div>
                       </div>

                       {/* User Info */}
                       <div className="space-y-4 sm:border-l border-white/5 sm:pl-6">
                          <div className="flex items-start gap-3 text-sm">
                            <User size={18} className="text-blue-500 shrink-0 mt-0.5" />
                            <div>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Booked By (Player)</p>
                               <p className="font-bold text-white tracking-wide">{booking.user?.name || "Deleted User"}</p>
                               <p className="text-[10px] text-gray-400 mt-0.5 truncate">{booking.user?.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-sm">
                            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0">
                               <IndianRupee size={16} />
                            </div>
                            <div>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Total Price</p>
                               <p className="font-black text-emerald-400 text-lg">{booking.price}</p>
                            </div>
                          </div>
                       </div>
                    </div>
                    
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBookings;
