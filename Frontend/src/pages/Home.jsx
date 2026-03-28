import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import GlassCard from "../components/GlassCard";
import { motion } from "framer-motion";
import Reviews from "./Reviews";
import AboutUs from "./AboutUs";

// --- ANIMATION BACKGROUND COMPONENT ---
function CricketBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let objects = [];
    const COUNT = 8; 

    const randBetween = (a, b) => a + Math.random() * (b - a);

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      init();
    }

    function init() {
      objects = [];
      for (let i = 0; i < COUNT; i++) {
        const isBat = i % 2 === 0; 
        objects.push({
          type: isBat ? "bat" : "ball",
          x: randBetween(0, canvas.width),
          y: randBetween(0, canvas.height),
          vx: randBetween(-0.35, 0.35),
          vy: randBetween(-0.35, 0.35),
          angle: randBetween(0, Math.PI * 2),
          rotSpeed: randBetween(-0.008, 0.008),
          size: isBat ? randBetween(30, 60) : randBetween(10, 15), 
          alpha: randBetween(0.15, 0.40), 
          color: isBat
            ? Math.random() > 0.5 ? "#60a5fa" : "#818cf8"
            : Math.random() > 0.5 ? "#34d399" : "#f87171",
        });
      }
    }

    function drawBat(x, y, size, angle, alpha, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      const handleLen = size * 0.6;
      const bladeW = size * 0.55;
      const bladeH = size * 1.6;
      const gripW = size * 0.18;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8; 
      
      ctx.beginPath();
      ctx.roundRect(-bladeW / 2, -bladeH * 0.1, bladeW, bladeH, [size * 0.08, size * 0.08, size * 0.15, size * 0.15]);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-gripW / 2, -bladeH * 0.1);
      ctx.lineTo(-gripW / 2, -bladeH * 0.1 - handleLen);
      ctx.lineTo(gripW / 2, -bladeH * 0.1 - handleLen);
      ctx.lineTo(gripW / 2, -bladeH * 0.1);
      ctx.stroke();
      ctx.restore();
    }

    function drawBall(x, y, r, angle, alpha, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8; 
      
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.bezierCurveTo(-r * 0.5, -r * 0.6, r * 0.5, -r * 0.6, r, 0);
      ctx.stroke();
      ctx.restore();
    }

    function draw() {
      if (!canvas) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const pad = 20;

      objects.forEach((o) => {
        o.x += o.vx;
        o.y += o.vy;
        o.angle += o.rotSpeed;
        if (o.x < -pad) o.x = W + pad;
        if (o.x > W + pad) o.x = -pad;
        if (o.y < -pad) o.y = H + pad;
        if (o.y > H + pad) o.y = -pad;

        if (o.type === "bat") drawBat(o.x, o.y, o.size, o.angle, o.alpha, o.color);
        else drawBall(o.x, o.y, o.size, o.angle, o.alpha, o.color);
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full max-w-full opacity-70 pointer-events-none" />;
}

// --- MAIN HOME COMPONENT ---
function Home() {
  const navigate = useNavigate();
  const [turfs, setTurfs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check for screen size to disable animation on mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    API.get("/turfs")
      .then((res) => setTurfs(res.data))
      .catch((err) => console.error("Error fetching turfs:", err));
  }, []);

  const bestTurfs = turfs.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden relative">
      
      {/* HERO SECTION */}
      <section className="relative h-[95vh] flex flex-col justify-center items-center max-w-full text-center px-4 md:px-6 overflow-hidden">
        
        {/* Only show animation if NOT on mobile */}
        {!isMobile && <CricketBackground />}

        {/* Hero Content */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Find & Book <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Turfs</span> Near You 
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            Experience the next generation of sports booking. Instant slots, 
            premium arenas, and zero hassle.
          </p>
        </motion.div>

        <motion.div 
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={() => navigate('/explore')} 
            className="w-full py-4 rounded-2xl font-black text-[11px] md:text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-blue-600/20 hover:-translate-y-[2px] active:scale-[0.98]"
          >
            Explore All Turfs
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500/60 to-transparent rounded-full" />
        </div>
      </section>

      {/* TURF LIST SECTION */}
      <section className="relative z-10 max-w-7xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Best <span className="text-blue-400">Turfs</span> in Surat
          </h2>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500/20 to-transparent ml-6 hidden md:block" />
        </div>

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
                  <div className="relative h-48 mb-6 rounded-2xl overflow-hidden bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                       <span className="text-6xl drop-shadow-2xl opacity-40">🏟️</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-1 tracking-tight uppercase text-white">{turf.name}</h3>
                  <div className="flex items-center text-gray-500 mb-6">
                    <span className="mr-2 text-blue-400">📍</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{turf.location}</span>
                  </div>

                  <div className="flex justify-between items-center pt-5 border-t border-white/5">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-1">Starting from</p>
                      <p className="text-2xl font-black text-emerald-400">
                        ₹{turf.pricePerSlot}
                      </p>
                    </div>
                    <button className="bg-white/5 hover:bg-blue-600 w-12 h-12 flex items-center justify-center rounded-xl transition-all group">
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center py-20 opacity-30">
               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
               <p className="font-black uppercase tracking-widest text-xs">Fetching Arenas...</p>
            </div>
          )}
        </div>
      </section>

      <div id="about-section" className="scroll-mt-20">
        <AboutUs/>
      </div>
      
      <div className="bg-[#0f172a]/30 backdrop-blur-sm border-y border-white/5">
        <Reviews />
      </div>

      <footer className="py-12 text-center">
        <div className="mb-4">
           <span className="text-xl font-black tracking-tighter uppercase">Arena<span className="text-blue-500">X</span></span>
        </div>
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 ArenaX Premium • All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default Home;