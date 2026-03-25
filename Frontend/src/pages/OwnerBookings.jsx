import { useEffect, useState } from "react";
import API from "../services/api";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";

function OwnerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/bookings/owner")
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching owner bookings:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-white">
        <div className="text-xl">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">All Bookings</h1>
        <p className="text-gray-400">Manage all bookings for your turfs</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-2xl font-bold mb-2">No bookings yet</h3>
          <p className="text-gray-400">Your turfs don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard className="h-full border border-white/5 hover:border-blue-500/30 transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1">{booking.turf?.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">📍 {booking.turf?.location}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">👤</span>
                    <span className="text-sm font-medium">{booking.user?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">📧</span>
                    <span className="text-sm text-gray-300">{booking.user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">📅</span>
                    <span className="text-sm">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">⏰</span>
                    <span className="text-sm">{booking.slot}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Revenue</p>
                      <p className="text-2xl font-black text-emerald-400">
                        ₹{booking.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Status</p>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerBookings;