import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", form);

    login(res.data); // save user + token
    toast.success("Login successful 🔥");

    // 🔥 ROLE BASED REDIRECT
    if (res.data.user.role === "owner") {
      navigate("/owner");
    } else if (res.data.user.role === "admin") {
      navigate("/admin"); // future use
    } else {
      navigate("/");
    }

  } catch (err) {
    toast.error("Invalid credentials ❌");
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-glass backdrop-blur-xl p-8 rounded-2xl w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4">Login</h2>

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

        <button className="w-full bg-primary py-2 rounded mt-2">
          Login
        </button>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;