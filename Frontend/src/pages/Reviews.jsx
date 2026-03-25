import { motion } from "framer-motion";

function Reviews() {
  const data = [
    { name: "Aman", text: "Amazing turf experience 🔥", rating: 5 },
    { name: "Rahul", text: "Booking was super easy", rating: 4 },
    { name: "Zaid", text: "Loved the UI and smooth booking", rating: 5 }
  ];

  return (
    <div className="relative max-w-7xl mx-auto p-8 md:p-16 overflow-hidden">
      {/* SECTION HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          What Our <span className="text-blue-400">Players</span> Say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full" />
      </div>

      {/* REVIEWS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            {/* GLASSY CARD */}
            <div className="relative z-10 h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 hover:border-blue-500/40 transition-all duration-500 shadow-2xl shadow-black/20">
              
              {/* QUOTE ICON (Decorative) */}
              <div className="absolute top-4 right-6 text-6xl text-white/5 font-serif pointer-events-none group-hover:text-blue-500/10 transition-colors">
                “
              </div>

              {/* STARS */}
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <span key={idx} className="text-yellow-500 text-sm">⭐</span>
                ))}
              </div>

              {/* REVIEW TEXT */}
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "{r.text}"
              </p>

              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-blue-400 font-semibold tracking-wide">
                    {r.name}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase">Verified Player</p>
                </div>
              </div>
            </div>

            {/* HOVER GLOW EFFECT */}
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;