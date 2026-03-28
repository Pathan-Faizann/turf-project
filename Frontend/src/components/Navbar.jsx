import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Menu, X, Home, Compass, Phone } from "lucide-react";

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

  // Route change hote hi menu close ho jaye
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "HOME", path: "/", icon: <Home size={20} /> },
    { name: "ALL TURFS", path: "/explore", icon: <Compass size={20} /> },
    { name: "MY BOOKINGS", path: "/my-bookings", icon: <Calendar size={20} /> },
    { name: "CONTACT US", path: "/contact-us", icon: <Phone size={20} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0  w-full md:w-auto right-0 z-[100] transition-all duration-500 ${
      isScrolled ? "py-2 pt-4" : "py-4 md:py-6"
    }`}>
      <div className="max-w-8xl mx-auto px-6 sm:px-6">
        <div className={`relative  transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? "bg-[#020617]/90 backdrop-blur-xl border-white/10 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}>
          
          {/* MAIN BAR CONTAINER */}
          <div className="px-4  py-3 md:px-6 md:py-4 flex justify-between items-center">
            
            {/* 1. BRAND LOGO (Always Left) */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 relative z-10">
              <div className="w-9 h-9 md:w-11 md:h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <span className="text-white font-black text-lg md:text-2xl italic">A</span>
              </div>
              <h1 className="text-lg md:text-2xl font-black tracking-tighter text-white">
                ARENA<span className="text-blue-500">X</span>
              </h1>
            </Link>

            {/* 2. CENTRAL NAV (Desktop Only - lg breakpoint) */}
            <div className="hidden lg:flex items-center bg-white/5 rounded-full me-7 px-2 py-1.5 border border-white/5 backdrop-blur-md">
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

            {/* 3. ACTION AREA */}
            <div className="flex items-center gap-3">
              {/* DESKTOP VIEW: Login/Profile (Hidden on screens smaller than lg) */}
              <div className="hidden lg:flex items-center gap-3">
                {!user ? (
                  <>
                    <Link to="/login" className="text-[11px] font-black text-gray-300 px-7 py-3.5 hover:text-white transition-all tracking-widest border border-white/20 rounded-2xl bg-white/5 hover:bg-white/10">
                      LOGIN
                    </Link>
                    <Link to="/register" className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-xl shadow-blue-600/20 px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 transition-all hover:-translate-y-[2px] active:scale-[0.98] whitespace-nowrap">
                      JOIN NOW
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-sm font-black text-white">
                        {user.name[0].toUpperCase()}
                      </div>
                      <span className="text-xs font-black text-white uppercase tracking-widest">{user.name.split(' ')[0]}</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* MOBILE MENU BUTTON (Visible only on screens smaller than lg) */}
              <button 
                onClick={() => setMobileMenuOpen(true)} 
                className="lg:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-white active:scale-95 transition-all"
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* MOBILE DRAWER (SIDEBAR) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop for extra polish */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[140] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-[#020617] border-l border-white/10 z-[150] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic text-sm">A</div>
                  <span className="font-black text-white tracking-widest uppercase text-sm">Menu</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex-1 p-6 space-y-3 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      isActive(link.path) 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "bg-white/5 text-gray-400 border border-white/5"
                    }`}
                  >
                    {link.icon}
                    <span className="text-xs font-black tracking-widest uppercase">{link.name}</span>
                  </Link>
                ))}

                <div className="my-6 border-t border-white/5 pt-6 space-y-3">
                  {!user ? (
                    <>
                      <Link to="/login" className="block w-full text-center p-4 rounded-2xl bg-white/5 text-white font-black tracking-widest border border-white/10 text-xs">
                        LOGIN
                      </Link>
                      <Link to="/register" className="w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all mt-2 shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-blue-600/20 hover:-translate-y-[2px] active:scale-[0.98]">
                        JOIN NOW
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-white border border-white/10">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">{user.name[0]}</div>
                        <span className="text-xs font-black tracking-widest uppercase">MY PROFILE</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;