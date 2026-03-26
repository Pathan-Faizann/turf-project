import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, User, Menu, X, Home, Compass, Info } from "lucide-react";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "HOME", path: "/", icon: <Home size={20} /> },
    { name: "EXPLORE", path: "/explore", icon: <Compass size={20} /> },
    { name: "MY BOOKINGS", path: "/my-bookings", icon: <Calendar size={20} /> },
    { name: "ABOUT", path: "/about", icon: <Info size={20} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled ? "py-3 pt-6" : "py-6"
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className={`relative transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? "bg-[#020617]/90 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}>
          
          <div className="px-5 py-3 md:px-6 md:py-4 flex justify-between items-center">
            
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative w-10 h-10 md:w-11 md:h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <span className="text-white font-black text-xl md:text-2xl italic">A</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white">
                ARENA<span className="text-blue-500">X</span>
              </h1>
            </Link>

            {/* CENTRAL NAVIGATION (Desktop Only) */}
            <div className="hidden lg:flex items-center bg-white/5 rounded-full px-2 py-1.5 border border-white/5 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-6 py-2 text-[11px] font-black tracking-widest transition-all duration-300 ${
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
            <div className="flex items-center gap-3">
              {!user ? (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="hidden sm:block text-[11px] font-black text-gray-400 hover:text-white transition-all tracking-widest">
                    LOGIN
                  </Link>
                  <Link to="/register" className="bg-blue-600 hover:bg-blue-500 px-5 md:px-7 py-2.5 md:py-3 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all active:scale-95">
                    <span className="text-[10px] md:text-[11px] font-black tracking-widest text-white whitespace-nowrap">JOIN NOW</span>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  {/* Dashboard (Owner) */}
                  {user.role === "owner" && (
                    <Link to="/owner" className="hidden md:flex p-2.5 bg-white/5 rounded-xl text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                      <LayoutDashboard size={20} />
                    </Link>
                  )}

                  {/* USER PROFILE LINK */}
                  <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-sm font-black text-white shadow-lg">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-black text-white hidden md:block uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                  </Link>
                </div>
              )}

              {/* MOBILE HAMBURGER BUTTON */}
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER (Full Page Style) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#020617] z-[150] lg:hidden flex flex-col"
          >
            {/* Header in Mobile Menu */}
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic">A</div>
                <span className="font-black text-white tracking-widest uppercase">Menu</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-2xl text-gray-400">
                <X size={24} />
              </button>
            </div>

            {/* Links Section */}
            <div className="flex-1 p-6 space-y-3 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-4 p-5 rounded-[1.5rem] transition-all ${
                    isActive(link.path) 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "bg-white/5 text-gray-400 border border-white/5"
                  }`}
                >
                  {link.icon}
                  <span className="text-sm font-black tracking-[0.2em] uppercase">{link.name}</span>
                </Link>
              ))}

              {user?.role === "owner" && (
                <Link to="/owner" className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">
                  <LayoutDashboard size={20} />
                  <span className="text-sm font-black tracking-[0.2em] uppercase">OWNER PANEL</span>
                </Link>
              )}
            </div>

            {/* Bottom Actions for Mobile - Removed logout, users can logout from profile */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;