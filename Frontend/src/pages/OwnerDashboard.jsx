import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";
import { useEffect, useState } from "react";
import API from "../services/api";
import { Layout, Calendar, IndianRupee, TrendingUp } from "lucide-react";

function OwnerDashboard() {
  const [stats, setStats] = useState({
    totalTurfs: 0,
    bookingsToday: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/owner/stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const statCards = [
    { 
      title: "Total Arenas", 
      value: stats.totalTurfs, 
      icon: <Layout className="text-blue-400" />, 
      color: "text-blue-400" 
    },
    { 
      title: "Today's Bookings", 
      value: stats.bookingsToday, 
      icon: <Calendar className="text-emerald-400" />, 
      color: "text-emerald-400" 
    },
    { 
      title: "Gross Revenue", 
      value: `₹${stats.revenue.toLocaleString()}`, 
      icon: <TrendingUp className="text-amber-400" />, 
      color: "text-amber-400" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-black tracking-tight">
          Owner <span className="text-blue-500">Analytics</span>
        </h1>
        <p className="text-gray-500 mt-2">Real-time performance of your turf business.</p>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {statCards.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="relative group p-8 border border-white/5 hover:border-blue-500/20 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Live Data</span>
              </div>
              
              <h2 className="text-gray-400 font-medium mb-1">{item.title}</h2>
              <p className={`text-4xl font-black ${item.color}`}>
                {loading ? "..." : item.value}
              </p>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-transparent group-hover:w-full transition-all duration-700" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
      
      {/* Quick Action */}
      <div className="max-w-7xl mx-auto mt-12">
         <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/10 transition-all text-sm font-bold">
            Download Detailed Report
         </button>
      </div>
    </div>
  );
}

export default OwnerDashboard;