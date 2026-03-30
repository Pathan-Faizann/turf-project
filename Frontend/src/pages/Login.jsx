import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from "lucide-react";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data); 
      toast.success("Welcome Back! 🔥");

      // ROLE BASED REDIRECT
      const role = res.data.user.role;
      if (role === "owner") navigate("/owner");
      else if (role === "admin") navigate("/admin");
      else navigate("/");

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#020617] flex flex-col justify-center md:pt-30 items-center p-4 overflow-hidden relative">
      
      {/* AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/10 blur-[100px] md:blur-[130px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[620px] z-10"
      >
        {/* CARD CONTAINER */}
        <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 p-8 md:p-10  rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
          
          {/* TOP LOGO/ICON */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl mb-4 border border-blue-500/20">
              <ShieldCheck className="text-blue-400" size={28} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Access <span className="text-blue-500 italic">ArenaX</span></h2>
            <p className="text-gray-500 mt-2 text-[10px] font-bold uppercase tracking-[0.2em]">Secure Member Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* EMAIL INPUT */}
            <div className="group space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative">
                <input
                  required
                  type="email"
                  placeholder="name@email.com"
                  className="w-full bg-black/20 border border-white/5 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Mail className="absolute left-4 top-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="group space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Secret Key</label>
                <Link to="/forgot-password" size={18} className="text-[10px] font-bold text-blue-500/60 hover:text-blue-400 transition-colors uppercase tracking-tighter">
                  Lost Access?
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/20 border border-white/5 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all duration-300"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <Lock className="absolute left-4 top-4 text-gray-700 group-focus-within:text-blue-500 transition-colors" size={18} />
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <div className="pt-4">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all mt-6 shadow-xl ${
                  loading 
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-blue-600/20"
                }`}
              >
                {loading ? "Verifying..." : <>Enter Portal <ArrowRight size={16} /></>}
              </motion.button>
            </div>
          </form>

          {/* FOOTER */}
          <div className="text-center mt-8">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
              New to the Arena?{" "}
              <Link to="/register" className="text-blue-500 hover:text-blue-400 transition-colors ml-1 underline underline-offset-4 decoration-blue-500/20">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </motion.div>

      {/* FOOTER DECOR */}
      <p className="absolute bottom-8 text-[9px] text-gray-700 font-black uppercase tracking-[0.5em] pointer-events-none">
        Protocol ArenaX 2.0
      </p>
    </div>
  );
}

export default Login;