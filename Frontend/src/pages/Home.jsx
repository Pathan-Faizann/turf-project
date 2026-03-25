import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
import API from "../services/api";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import Reviews from "./Reviews";

function Home() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    API.get("/turfs")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error("Error fetching turfs:", err));
  }, []);

  // Show only first 3 turfs for "Best Turfs in Surat"
  const bestTurfs = turfs.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      {/* HERO SECTION */}
      <section className="relative h-[95vh] pt-2 flex flex-col justify-center items-center text-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Find & Book <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Turfs</span> Near You 
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Experience the next generation of sports booking. Instant slots, 
            premium arenas, and zero hassle.
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <div className="relative group w-full max-w-md">
          <button onClick={() => navigate('/explore')} className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all">
            Explore All Turfs
          </button>
        </div>
      </section>

      {/* TURF LIST SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Best <span className="text-blue-400">Turfs</span> in Surat
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-6 hidden md:block" />
        </div>

        {/* GRID: Show only 3 best turfs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestTurfs.length > 0 ? (
            bestTurfs.map((turf, i) => (
              <motion.div
                key={turf._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <GlassCard onClick={() => navigate(`/turf/${turf._id}`)} className="h-full border border-white/5 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer">
                  <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-white/5">
                    {/* Placeholder for Turf Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                       <span className="text-5xl">🏟️</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1 tracking-tight">{turf.name}</h3>
                  <div className="flex items-center text-gray-400 mb-4">
                    <span className="mr-1 text-blue-400">📍</span>
                    <span className="text-sm">{turf.location}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Price per slot</p>
                      <p className="text-2xl font-black text-emerald-400">
                        ₹{turf.pricePerSlot}
                      </p>
                    </div>
                    <button onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/turf/${turf._id}`);
                    }} className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all">
                      →
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 py-20">
              Loading turfs...
            </p>
          )}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <div className="bg-white/2 backdrop-blur-sm">
        <Reviews />
      </div>

      {/* FOOTER SPACE */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        © 2026 TurfBooker Premium. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;