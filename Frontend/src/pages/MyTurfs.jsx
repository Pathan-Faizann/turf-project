import { useEffect, useState } from "react";
import API from "../services/api";
import GlassCard from "../components/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, IndianRupee, LayoutGrid, Settings2, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";



function MyTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch only Owner's Turfs
  useEffect(() => {
    API.get("/turfs/owner") // owner-specific listing endpoint
      .then((res) => {
        setTurfs(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // DELETE HANDLER
 const handleDelete = async (id) => {
    // Agar id ki value me ':' pehle se hai toh use trim karo
    const cleanId = id.startsWith(":") ? id.slice(1) : id;

    if (window.confirm("Are you sure?")) {
      try {
        // Dhyaan de: Yahan koi colon (:) nahi hona chahiye path me
        await API.delete(`/turfs/${cleanId}`);
        setTurfs((prev) => prev.filter((t) => t._id !== cleanId));
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Failed to delete");
      }
    }
};

  return (
    <div className="min-h-screen bg-[#020617] p-6 md:p-12 text-white">
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
            <LayoutGrid className="text-blue-500 w-8 h-8" />
            My <span className="text-blue-400">Turfs</span>
          </h2>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            Manage your listed arenas and booking configurations.
          </p>
        </div>
        
       

<button onClick={() => navigate("/owner/add")}>
  + Add New Turf
</button>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {turfs.map((turf, i) => (
                <motion.div
                  key={turf._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  layout
                >
                  <GlassCard className="relative group overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full">
                    
                    {/* STATUS LABEL & DELETE TOP ACTION */}
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-500/20 backdrop-blur-md">
                        Live
                      </span>
                      <button 
                        onClick={() => handleDelete(turf._id)}
                        className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg border border-red-500/20 transition-all shadow-lg"
                        title="Delete Turf"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* IMAGE PLACEHOLDER */}
                    <div className="relative h-44 -mx-2 -mt-2 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/40 to-[#020617] flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                      <span className="text-4xl opacity-40">🏟️</span>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>

                    {/* INFO */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Arena Name</label>
                        <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {turf.name}
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={16} className="text-blue-500" />
                        <span className="text-sm truncate">{turf.location}</span>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Price / Slot</label>
                          <div className="flex items-center text-xl font-black text-emerald-400">
                            <IndianRupee size={18} />
                            <span>{turf.pricePerSlot}</span>
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex gap-2">
                          <button title="View Details" className="p-2.5 bg-white/5 hover:bg-blue-500/20 rounded-xl border border-white/5 hover:border-blue-500/40 transition-all">
                            <Eye size={18} className="text-gray-400 group-hover:text-blue-400" />
                          </button>
                          <button title="Settings" className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all">
                            <Settings2 size={18} className="text-gray-400 group-hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>

            {!loading && turfs.length === 0 && (
              <div className="text-center py-20 bg-white/2 rounded-[2rem] border border-dashed border-white/10 col-span-full">
                <p className="text-gray-500">No turfs listed yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTurfs;