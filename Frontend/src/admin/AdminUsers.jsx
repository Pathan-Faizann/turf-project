import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, Shield, ChevronRight } from "lucide-react";
import API from "../services/api";

function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [usersInfo, setUsersInfo] = useState({
    players: [],
    owners: [],
  });

  useEffect(() => {
    // Fetch users and separate them
    const fetchUsers = async () => {
      try {
        const res = await API.get("/admin/users");
        // Expecting backend to return { players: [...], owners: [...] } or a flat list
        if (res.data.players && res.data.owners) {
           setUsersInfo(res.data);
        } else {
           // If flat list
           const allUsers = res.data;
           setUsersInfo({
              players: allUsers.filter(u => u.role === "user"),
              owners: allUsers.filter(u => u.role === "owner")
           });
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        // Fallback demo data
        setUsersInfo({
          players: [
            { _id: '1', name: 'John Doe', email: 'john@example.com', createdAt: '2026-03-25T10:00:00Z' },
            { _id: '2', name: 'Alex Smith', email: 'alex@example.com', createdAt: '2026-03-26T14:30:00Z' },
            { _id: '3', name: 'Michael Johnson', email: 'mike@example.com', createdAt: '2026-03-27T09:15:00Z' },
            { _id: '4', name: 'James Brown', email: 'james@example.com', createdAt: '2026-03-28T11:45:00Z' }
          ],
          owners: [
            { _id: '5', name: 'Turf Master', email: 'owner@turf.com', createdAt: '2026-01-10T08:00:00Z', turfsCount: 2 },
            { _id: '6', name: 'City Arena', email: 'contact@cityarena.com', createdAt: '2026-02-15T09:00:00Z', turfsCount: 1 },
            { _id: '7', name: 'Green Field', email: 'green@field.com', createdAt: '2026-03-01T12:00:00Z', turfsCount: 3 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const UserCard = ({ user, isOwner }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOwner ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
          {isOwner ? <Shield size={20} /> : <Users size={20} />}
        </div>
        <div>
          <h3 className="font-bold text-white text-sm md:text-base">{user.name}</h3>
          <p className="text-gray-400 text-xs">{user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isOwner ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
              {isOwner ? 'Turf Owner' : 'Player'}
            </span>
            {isOwner && user.turfsCount && (
              <span className="text-[9px] font-bold text-gray-500">
                • {user.turfsCount} Turfs
              </span>
            )}
          </div>
        </div>
      </div>
      <button className="text-gray-500 hover:text-white transition-colors">
        <ChevronRight size={20} />
      </button>
    </motion.div>
  );

  return (
    <div className="h-full bg-transparent text-white pt-8 pb-12 px-4 md:px-10 lg:px-12 relative overflow-hidden">
      {/* BACKGROUND DECOR */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
            User Management
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Directory</span>
          </h1>
          <p className="text-gray-500 text-xs md:text-sm font-bold mt-2">
            Overview of all registered players and turf owners.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* PLAYERS COLUMN */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wide">Registered Players</h2>
                    <p className="text-xs text-blue-400 font-bold tracking-wider">{usersInfo.players.length} Total</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                 {usersInfo.players.length > 0 ? (
                   usersInfo.players.map(player => (
                     <UserCard key={player._id} user={player} isOwner={false} />
                   ))
                 ) : (
                    <p className="text-gray-500 text-center text-sm italic py-10">No players found.</p>
                 )}
              </div>
            </div>

            {/* OWNERS COLUMN */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <UserCheck size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-wide">Turf Owners</h2>
                    <p className="text-xs text-emerald-400 font-bold tracking-wider">{usersInfo.owners.length} Total</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                 {usersInfo.owners.length > 0 ? (
                   usersInfo.owners.map(owner => (
                     <UserCard key={owner._id} user={owner} isOwner={true} />
                   ))
                 ) : (
                    <p className="text-gray-500 text-center text-sm italic py-10">No turf owners found.</p>
                 )}
              </div>
            </div>

          </div>
        )}
      </div>

      <style jsx global>{`
        /* Custom Scrollbar for columns */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

export default AdminUsers;
