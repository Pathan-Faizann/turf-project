import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, User, LogOut, Menu, X } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? "py-3" : "py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`relative overflow-hidden transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? "bg-[#020617]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" 
            : "bg-transparent border-transparent"
        }`}>
          
          <div className="px-6 py-3 flex justify-between items-center">
            
            {/* LOGO SECTION */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-white font-black text-xl tracking-tighter italic">A</span>
                </div>
              </div>
              <h1 className="text-xl font-black tracking-widest text-white hidden sm:block">
                ARENA<span className="text-blue-500">X</span>
              </h1>
            </Link>

            {/* CENTRAL NAVIGATION (Desktop) */}
            <div className="hidden md:flex items-center bg-white/5 rounded-full px-2 py-1 border border-white/5 backdrop-blur-md">
              {[
                { name: "Home", path: "/" },
                { name: "Explore", path: "/explore" },
                { name: "About", path: "/about" }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    isActive(link.path) ? "text-white" : "text-gray-400 hover:text-blue-400"
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-600/20 rounded-full border border-blue-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* ACTION AREA */}
            <div className="flex items-center gap-3">
              {!user ? (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-all uppercase tracking-widest">
                    Login
                  </Link>
                  <Link to="/register" className="relative group px-6 py-2.5 overflow-hidden rounded-xl bg-blue-600">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 text-xs font-black uppercase tracking-widest text-white">Join Now</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* DASHBOARDS (Icons for cleaner look) */}
                  <div className="hidden lg:flex items-center gap-1 border-r border-white/10 pr-3 mr-1">
                    <NavIconButton to="/my-bookings" icon={<Calendar size={18} />} label="Bookings" />
                    {user.role === "owner" && (
                      <NavIconButton to="/owner" icon={<LayoutDashboard size={18} />} label="Owner" />
                    )}
                  </div>

                  {/* USER PROFILE CARD */}
                  <Link to="/profile" className="flex items-center gap-3 p-1 pl-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
                    <span className="text-xs font-bold text-gray-300 hidden xl:block">{user.name.split(' ')[0]}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-xs font-black text-white shadow-lg group-hover:scale-105 transition-transform">
                      {user.name[0]}
                    </div>
                  </Link>

                  {/* LOGOUT */}
                  <button onClick={logout} className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              {/* MOBILE MENU TOGGLE */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-400">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}

// Helper component for cleaner dashboard icons
function NavIconButton({ to, icon, label }) {
  return (
    <Link to={to} className="p-2.5 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all relative group" title={label}>
      {icon}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
        {label}
      </span>
    </Link>
  );
}

export default Navbar;