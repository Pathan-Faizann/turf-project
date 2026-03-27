import { motion } from "framer-motion";
import { Users, ShieldCheck, Zap, Target, Award, Globe } from "lucide-react";
import img from "../assets/turf.webp"

function AboutUs() {
  const stats = [
    { label: "Active Players", value: "10K+", icon: <Users className="text-blue-500" /> },
    { label: "Premium Turfs", value: "150+", icon: <Target className="text-emerald-500" /> },
    { label: "Cities Covered", value: "25+", icon: <Globe className="text-purple-500" /> },
    { label: "Awards Won", value: "12", icon: <Award className="text-yellow-500" /> },
  ];

  const features = [
    {
      title: "Easy Booking",
      desc: "Book your favorite slot in less than 30 seconds with our seamless interface.",
      icon: <Zap size={24} />,
    },
    {
      title: "Verified Arenas",
      desc: "Every turf on our platform is personally verified for quality and safety.",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "24/7 Support",
      desc: "Our team is always there to help you with your bookings and queries.",
      icon: <Users size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase mb-4 block"
          >
            Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6"
          >
            We are redefining the <span className="text-blue-600">Sports</span> Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm md:text-lg leading-relaxed font-medium"
          >
            ArenaX is more than just a booking platform. It's a community for athletes, 
            weekend warriors, and anyone who believes that sports should be accessible to everyone, everywhere.
          </motion.p>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[2rem] text-center hover:bg-white/10 transition-colors group"
            >
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black mb-1">{stat.value}</h3>
              <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* MISSION & VISION */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <img 
                src={img}
                alt="Turf" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Card */}
            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl hidden md:block">
              <p className="text-2xl font-black italic">EST. 2026</p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Our Mission is <br/><span className="text-blue-500">Simple but Bold</span></h2>
            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black uppercase tracking-wide mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-blue-600 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 relative z-10">Ready to start your <br/>next game?</h2>
          <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-[#020617] hover:text-white transition-all duration-300 relative z-10 shadow-xl">
            Join the Arena
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUs;