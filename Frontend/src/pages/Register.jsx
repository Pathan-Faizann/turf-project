import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { User, Mail, Lock, UserCircle, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Welcome to ArenaX! 🔥");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full md:pt-25 bg-[#020617] flex flex-col justify-center items-center p-4 overflow-hidden relative">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[650px] z-10"
      >
        <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20">
              <Sparkles className="text-blue-400" size={24} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Create <span className="text-blue-500 italic">Account</span></h2>
            <p className="text-gray-500 mt-2 text-xs font-medium uppercase tracking-widest">Join the elite sports community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* ROLE TOGGLE (Custom Radio Style) */}
            <div className="flex p-1.5 bg-black/40 border border-white/5 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setForm({...form, role: 'user'})}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.role === 'user' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                <UserCircle size={14} /> Player
              </button>
              <button
                type="button"
                onClick={() => setForm({...form, role: 'owner'})}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${form.role === 'owner' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                <ShieldCheck size={14} /> Turf Owner
              </button>
            </div>

            {/* NAME */}
            <div className="relative group">
              <input
                required
                className="w-full bg-black/20 border border-white/5 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <User className="absolute left-4 top-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            </div>

            {/* EMAIL */}
            <div className="relative group">
              <input
                required
                type="email"
                className="w-full bg-black/20 border border-white/5 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all"
                placeholder="Email Address"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Mail className="absolute left-4 top-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            </div>

            {/* PASSWORD */}
            <div className="relative group">
              <input
                required
                type="password"
                className="w-full bg-black/20 border border-white/5 p-4 pl-12 rounded-2xl text-white text-sm outline-none focus:border-blue-500/40 focus:bg-black/40 transition-all"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Lock className="absolute left-4 top-4 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            </div>

            {/* SUBMIT BUTTON */}
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
              {loading ? "Creating..." : <>Get Started <ArrowRight size={16} /></>}
            </motion.button>
          </form>

          {/* FOOTER LINKS */}
          <div className="text-center mt-8">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 ml-1 underline underline-offset-4 decoration-blue-500/30">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Register;