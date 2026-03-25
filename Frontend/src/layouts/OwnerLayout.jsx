import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function OwnerLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">
          Owner Panel
        </h2>

        <div className="flex flex-col gap-4">
          <Link to="/owner" className="hover:text-blue-400 transition-colors">Dashboard</Link>
          <Link to="/owner/add" className="hover:text-blue-400 transition-colors">Add Turf</Link>
          <Link to="/owner/turfs" className="hover:text-blue-400 transition-colors">My Turfs</Link>
          <Link to="/owner/all-bookings" className="hover:text-blue-400 transition-colors">All Bookings</Link>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        
        {/* TOPBAR */}
        <div className="bg-white/5 backdrop-blur-lg border-b border-white/10 px-6 py-4 flex justify-between">
          <h1 className="font-bold">Owner Dashboard</h1>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>

        {/* PAGE */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default OwnerLayout;