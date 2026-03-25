import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";

function Explore() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/turfs")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error("Error fetching turfs:", err));
  }, []);

  // Filter logic for search
  const filteredTurfs = turfs.filter((turf) =>
    turf.location.toLowerCase().includes(search.toLowerCase()) ||
    turf.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 pt-20">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>

      {/* HEADER */}
      <section className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Explore All <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Turfs</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Find and book your perfect turf from our complete collection
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative group w-full max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by location or turf name..."
            className="w-full p-4 pl-6 rounded-2xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none backdrop-blur-md"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/* TURF LIST SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            All <span className="text-blue-400">Available Turfs</span>
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-6 hidden md:block" />
        </div>

        {/* GRID: Responsive (1 col mobile, 2 col tablet, 3 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTurfs.length > 0 ? (
            filteredTurfs.map((turf, i) => (
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
              {search ? "No turfs found matching your search." : "Loading turfs..."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Explore;