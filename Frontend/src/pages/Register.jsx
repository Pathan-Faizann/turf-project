import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    role: "user" // default
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      toast.success("Registered Successfully 🔥");
      navigate("/login");
    } catch {
      toast.error("Registration failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl w-96 border border-white/10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Register</h2>

        <input
          className="w-full p-2 mb-3 bg-transparent border border-white/20 rounded"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 bg-transparent border border-white/20 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-transparent border border-white/20 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* 🔥 ROLE SELECT */}
        <select
          className="w-full p-2 mb-3 bg-transparent border border-white/20 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="owner">Turf Owner</option>
        </select>

        <button className="w-full bg-primary py-2 rounded mt-2">
          Register
        </button>
      </motion.form>
    </div>
  );
}

export default Register;