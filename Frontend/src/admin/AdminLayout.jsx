import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, LayoutDashboard, Users, MapPin, 
  CalendarCheck, MessageSquare, LogOut, ShieldAlert
} from "lucide-react";
import { toast } from "react-toastify";
import API from "../services/api";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = async () => {
    try {
      await API.post("/auth/admin-logout");
      localStorage.removeItem("arena_admin_auth");
      toast.success("Admin Logged Out Safely 🛡️");
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setShowLogoutModal(false);
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin-dashboard-turf", icon: <LayoutDashboard size={20} /> },
    { name: "All Users", path: "/admin-users-turf", icon: <Users size={20} /> },
    { name: "All Turfs", path: "/admin-turfs-turf", icon: <MapPin size={20} /> },
    { name: "All Bookings", path: "/admin-bookings-turf", icon: <CalendarCheck size={20} /> },
    { name: "Contact Messages", path: "/admin-contacts-turf", icon: <MessageSquare size={20} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-3 mb-10 px-2 mt-2">
        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/20">
          <ShieldAlert className="text-blue-500" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black uppercase tracking-widest text-white">Admin Panel</h2>
          <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">System Control</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {navLinks.map((link) => {
          const isActive = location.pathname.includes(link.path);
          return (
            <Link 
              key={link.path}
              to={link.path} 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-white/10">
        <button 
          onClick={() => {
            setSidebarOpen(false);
            setShowLogoutModal(true);
          }} 
          className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300 font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden relative">
      
      {/* Background Decor Effects shared across admin pages */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex w-[280px] bg-[#0f172a]/60 backdrop-blur-3xl border-r border-white/5 p-6 flex-col shadow-2xl z-20">
        <SidebarContent />
      </div>

      {/* MOBILE OVERLAY & SIDEBAR */}
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
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-[#0f172a]/95 backdrop-blur-3xl border-r border-white/10 p-6 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="absolute top-6 right-6">
                <button onClick={() => setSidebarOpen(false)} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white border border-white/5">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        
        {/* MOBILE TOPBAR (Hidden on Desktop because Sidebar has branding) */}
        <div className="lg:hidden bg-white/5 backdrop-blur-xl border-b border-white/5 px-4 py-4 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-black text-sm uppercase tracking-widest bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Admin Area
            </h1>
          </div>
        </div>

        {/* OUTLET SCROLLABLE AREA */}
        <div className="flex-1 overflow-auto custom-scrollbar relative">
          <Outlet />
        </div>
      </div>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0f172a] border border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-4 relative">
                <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping"></div>
                <LogOut className="w-8 h-8 text-red-500 relative z-10" />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2">Secure Logout</h3>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-8">
                Are you sure you want to lock the system terminal and exit?
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="py-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="py-4 rounded-2xl bg-red-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-500 transition-colors"
                >
                  Terminate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

export default AdminLayout;
