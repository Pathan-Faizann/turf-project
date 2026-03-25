import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, User, LogOut, Menu, X, Home, Compass, Info } from "lucide-react";

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  // Main Links - Fixed according to your request
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "EXPLORE", path: "/explore" },
    { name: "MY BOOKINGS", path: "/my-bookings" },
    { name: "ABOUT", path: "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? "py-3" : "py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className={`relative transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? "bg-[#020617]/90 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}>
          
          <div className="px-6 py-4 flex justify-between items-center">
            
            {/* BRAND LOGO (Matches your Screenshot) */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <span className="text-white font-black text-2xl italic">A</span>
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white">
                ARENA<span className="text-blue-500">X</span>
              </h1>
            </Link>

            {/* CENTRAL NAVIGATION (Bold & Large Fonts like screenshot) */}
            <div className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-2 text-xs font-black tracking-widest transition-all duration-300 ${
                    isActive(link.path) ? "text-white" : "text-gray-400 hover:text-blue-400"
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-blue-600/20 rounded-full border border-blue-500/40"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* ACTION AREA */}
            <div className="flex items-center gap-4">
              {!user ? (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-xs font-black text-gray-400 hover:text-white transition-all tracking-[0.1em]">
                    LOGIN
                  </Link>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                    <span className="text-xs font-black tracking-widest text-white">JOIN NOW</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Dashboard Icon (Owner) */}
                  {user.role === "owner" && (
                    <Link to="/owner" className="p-2.5 bg-white/5 rounded-xl text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all" title="Owner Dashboard">
                      <LayoutDashboard size={20} />
                    </Link>
                  )}

                  {/* USER PROFILE */}
                  <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-sm font-black text-white shadow-lg">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-black text-white hidden md:block uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                  </Link>

                  {/* LOGOUT */}
                  <button onClick={logout} className="p-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all">
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              {/* MOBILE TOGGLE */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300">
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER (Glassy) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-[#020617] border-l border-white/10 z-[120] p-8 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-black text-gray-500 tracking-[0.3em]">ARENAX MENU</span>
                <X onClick={() => setMobileMenuOpen(false)} className="text-gray-500" />
              </div>
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.path} className={`block p-4 rounded-xl text-xs font-black tracking-widest ${isActive(link.path) ? "bg-blue-600 text-white" : "text-gray-400 bg-white/5"}`}>
                    {link.name}
                  </Link>
                ))}
                {user?.role === "owner" && (
                   <Link to="/owner" className="block p-4 rounded-xl text-xs font-black tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                    OWNER DASHBOARD
                   </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;