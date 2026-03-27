import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function OwnerLayout() {
  const { logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* SIDEBAR - DESKTOP */}
      <div className="hidden lg:flex lg:w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 flex-col">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">
          Owner Panel
        </h2>

        <div className="flex flex-col gap-4">
          <Link to="/owner" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link to="/owner/add" className="hover:text-blue-400 transition-colors">Add Turf</Link>
          <Link to="/owner/turfs" className="hover:text-blue-400 transition-colors">My Turfs</Link>
          <Link to="/owner/all-bookings" className="hover:text-blue-400 transition-colors">All Bookings</Link>
          <Link to="/owner/profile" className="hover:text-blue-400 transition-colors">Profile</Link>
        </div>
      </div>

      {/* SIDEBAR - MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 z-50 lg:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-blue-400">
                  Owner Panel
                </h2>
                <button onClick={() => setSidebarOpen(false)} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link to="/owner" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400 transition-colors">Dashboard</Link>
                <Link to="/owner/add" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400 transition-colors">Add Turf</Link>
                <Link to="/owner/turfs" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400 transition-colors">My Turfs</Link>
                <Link to="/owner/all-bookings" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400 transition-colors">All Bookings</Link>
                <Link to="/owner/profile" onClick={() => setSidebarOpen(false)} className="hover:text-blue-400 transition-colors">Profile</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-4 lg:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-bold text-lg lg:text-xl">Owner Dashboard</h1>
          </div>
          <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 lg:px-4 lg:py-2 rounded text-sm lg:text-base transition-colors">
            Logout
          </button>
        </div>

        {/* PAGE */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default OwnerLayout;