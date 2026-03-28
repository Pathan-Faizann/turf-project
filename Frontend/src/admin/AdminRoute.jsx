import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../services/api";

function AdminRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        // This relies on the HTTP-only cookie automatically sent by Axios
        await API.get("/auth/admin-check");
        setIsAuthorized(true);
      } catch (error) {
        console.error("Admin Auth Check Failed:", error?.response?.data || error.message);
        localStorage.removeItem("arena_admin_auth");
        setIsAuthorized(false);
        toast.error("🛡️ Access Denied. Please provide the secret key.");
      }
    };
    
    verifyAdmin();
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#020617] text-white overflow-hidden">
        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 animate-pulse">
            Verifying Security Clearance
          </p>
        </div>
        <div className="absolute inset-0 bg-blue-900/5 blur-[100px] pointer-events-none" />
      </div>
    );
  }

  // If unauthorized, boot them to the admin login page
  if (isAuthorized === false) {
    return <Navigate to="/admin-login-turf" />;
  }

  // If authorized, render requested nested admin pages
  return children;
}

export default AdminRoute;
