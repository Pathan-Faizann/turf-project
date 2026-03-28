import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserCheck, 
  MapPin, 
  CalendarCheck, 
  TrendingUp, 
  ArrowUpRight,
  Activity
} from "lucide-react";
import API from "../services/api"; // Aapka axios instance

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOwners: 0,
    totalTurfs: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Call to fetch counts
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats"); // Backend endpoint for counts
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
        // Fallback for demo
        setStats({ totalUsers: 124, totalOwners: 45, totalTurfs: 82, totalBookings: 1250 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={24} />,
      color: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/20",
      label: "Active Customers"
    },
    {
      title: "Total Owners",
      value: stats.totalOwners,
      icon: <UserCheck size={24} />,
      color: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-500/20",
      label: "Turf Partners"
    },
    {
      title: "Total Turfs",
      value: stats.totalTurfs,
      icon: <MapPin size={24} />,
      color: "from-purple-600 to-purple-400",
      shadow: "shadow-purple-500/20",
      label: "Listed Arenas"
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <CalendarCheck size={24} />,
      color: "from-orange-600 to-orange-400",
      shadow: "shadow-orange-500/20",
      label: "Completed Slots"
    }
  ];

  return (
    <div className="h-full bg-transparent text-white pt-8 pb-12 px-4 md:px-10 lg:px-12 relative overflow-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
              System Overview
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
              Admin <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mt-2">
              Welcome back, Pathan Faizan
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 px-6 py-4 rounded-[2rem] flex items-center gap-4 backdrop-blur-xl"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Activity className="text-emerald-500 animate-pulse" size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Server Status</p>
              <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Operational</p>
            </div>
          </motion.div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300 shadow-2xl ${card.shadow}`}
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-500 text-white transform rotate-12">
                {card.icon}
              </div>

              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                  {card.icon}
                </div>
                <div className="p-2 bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors cursor-pointer">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                  {card.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black tracking-tighter">
                    {loading ? "..." : card.value.toLocaleString()}
                  </p>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center">
                    <TrendingUp size={10} className="mr-1" /> +12%
                  </span>
                </div>
                <p className="mt-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.2em]">
                  {card.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* QUICK ACTIONS SECTION (Optional) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 p-8 rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-white/5 backdrop-blur-sm">
              <h4 className="text-lg font-black uppercase tracking-widest mb-4">System Performance</h4>
              <div className="h-32 flex items-end gap-2 px-2">
                {/* Visual Placeholder for a Chart */}
                {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                  <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/20 rounded-t-lg border-t border-blue-500/40 hover:bg-blue-500/40 transition-all cursor-help" />
                ))}
              </div>
           </div>
           
           <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-xl shadow-blue-600/30">
                <CalendarCheck size={28} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest mb-2">New Bookings</h4>
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Check today's schedule and manage incoming requests.
              </p>
              <button className="mt-6 px-8 py-3 bg-white text-[#020617] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
                View All
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;