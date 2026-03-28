import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trash2, Calendar, IndianRupee, UserCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for delete modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: null,
    name: ""
  });

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const { data } = await API.get("/admin/turfs");
      setTurfs(data);
    } catch (error) {
      console.error("Error fetching turfs:", error);
      toast.error("Failed to fetch turfs");
      setTurfs([]);
    } finally {
      setLoading(false);
    }
  };

  const triggerDelete = (id, name) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/admin/turfs/${deleteModal.id}`);
      toast.success(`Turf "${deleteModal.name}" deleted successfully.`);
      setTurfs(turfs.filter((turf) => turf._id !== deleteModal.id));
    } catch (error) {
      console.error("Error deleting turf:", error);
      toast.error("Error deleting the turf. Please try again.");
    } finally {
      setDeleteModal({ isOpen: false, id: null, name: "" });
    }
  };

  return (
    <div className="h-full bg-transparent text-white pt-8 pb-12 px-4 md:px-10 lg:px-12 relative overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="mb-10 shrink-0">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
          Arena Management
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase relative z-10">
          All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Turfs</span>
        </h1>
        <p className="text-gray-500 text-xs md:text-sm font-bold mt-2">
          Monitor and manage all listed turfs in the system.
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : turfs.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
          <ShieldAlert size={48} className="text-gray-600 mb-4" />
          <p className="text-xl font-bold uppercase tracking-widest text-gray-500">No Turfs Found</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
            <AnimatePresence>
              {turfs.map((turf) => (
                <motion.div
                  layout
                  key={turf._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-2xl group flex flex-col"
                >
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    {/* Header: Name and Price */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white mb-1">
                          {turf.name}
                        </h2>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                          <IndianRupee size={12} /> {turf.pricePerSlot}/slot
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex flex-shrink-0 items-center justify-center text-blue-400 border border-white/10 shadow-inner">
                        <MapPin size={22} />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-3 mt-4 flex-1">
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <MapPin size={16} className="text-gray-500" />
                        <span className="flex-1 truncate">{turf.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <UserCheck size={16} className="text-gray-500" />
                        <span className="flex-1 truncate">
                          Owner: <span className="font-bold text-gray-300">{turf.owner?.name || "Unknown"}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-gray-400 text-xs">
                        <Calendar size={16} className="text-gray-500" />
                        <span>Registered: {new Date(turf.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
                    <button
                      onClick={() => triggerDelete(turf._id, turf.name)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 transition-all font-bold text-xs uppercase tracking-widest active:scale-95 group/btn"
                    >
                      <Trash2 size={16} className="group-hover/btn:animate-pulse" />
                      Delete Turf
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteModal({ isOpen: false, id: null, name: "" })}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Delete Turf?</h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-8">
                Are you sure you want to delete <span className="text-white">"{deleteModal.name}"</span>? This action cannot be undone.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeleteModal({ isOpen: false, id: null, name: "" })}
                  className="py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="py-4 rounded-2xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-500 transition-colors"
                >
                  Delete Turf
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminTurfs;
