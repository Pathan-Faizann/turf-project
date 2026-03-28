import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, Phone, CalendarClock, UserSquare2, ChevronRight, ActivitySquare } from "lucide-react";
import API from "../services/api";

function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await API.get("/admin/contacts");
      setMessages(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Status Badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case "resolved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "in-progress":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default: // pending
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  return (
    <div className="h-full bg-transparent text-white pt-8 pb-12 px-4 md:px-10 lg:px-12 relative overflow-hidden flex flex-col">
      {/* HEADER */}
      <div className="mb-10 shrink-0 border-b border-white/5 pb-8">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-2 block">
          Support Inbox
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase relative z-10">
          Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Messages</span>
        </h1>
        <p className="text-gray-500 text-xs md:text-sm font-bold mt-2 max-w-2xl leading-relaxed">
          Manage all incoming inquiries, booking issues, and feedback submitted by users through the Contact Us form.
        </p>
      </div>

      {loading ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
          <MessageSquare size={48} className="text-gray-600 mb-4" />
          <p className="text-xl font-bold uppercase tracking-widest text-gray-500">No Messages Yet</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 gap-4 pb-20 max-w-5xl">
            <AnimatePresence>
              {messages.map((msg) => {
                const isExpanded = expandedId === msg._id;

                return (
                  <motion.div
                    layout
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-300 shadow-xl ${isExpanded ? "border-blue-500/30 bg-[#0f172a]/80" : ""}`}
                  >
                    {/* Compact View Head */}
                    <div 
                      onClick={() => toggleExpand(msg._id)}
                      className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isExpanded ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "bg-white/5 text-gray-400"}`}>
                          <UserSquare2 size={24} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-black text-white uppercase tracking-wider">{msg.name}</h3>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${getStatusBadge(msg.status)}`}>
                              {msg.status}
                            </span>
                          </div>
                          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                            <ActivitySquare size={12} className="text-blue-500" /> {msg.purpose}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest flex items-center gap-1.5 whitespace-nowrap">
                          <CalendarClock size={12} />
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                        
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400"
                        >
                          <ChevronRight size={18} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expandable Body */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/5 bg-black/20 px-6 sm:px-20 py-6"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                            <div className="space-y-4">
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 border-b border-white/5 pb-2">Sender Contact</p>
                              
                              <div className="flex items-center gap-3 text-sm">
                                <Mail size={16} className="text-gray-500 shrink-0" />
                                <span className={msg.email ? "text-gray-300 font-medium" : "text-gray-600 italic"}>
                                  {msg.email || "No email provided"}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-sm">
                                <Phone size={16} className="text-gray-500 shrink-0" />
                                <span className="text-gray-300 font-medium">{msg.phone}</span>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 border-b border-white/5 pb-2">Full Message</p>
                              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-sm text-gray-300 leading-relaxed font-medium">
                                "{msg.message}"
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminContacts;
