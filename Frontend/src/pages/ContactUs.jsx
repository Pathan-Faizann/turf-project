import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageSquare, Smartphone, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    turf: "General Enquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to send a message! 🔒");
      navigate("/login");
      return;
    }
    
    try {
      await API.post("/contacts", formData);
      toast.success("Message sent! We'll contact you soon. 🚀");
      setFormData({ name: "", phone: "", email: "", turf: "General Enquiry", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    }
  };

  const contactMethods = [
    {
      icon: <Phone size={24} />,
      title: "Call or WhatsApp",
      detail: "+91 98765 43210",
      sub: "Available 24/7 for bookings",
      color: "text-emerald-500",
      link: "https://wa.me/919876543210"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Support",
      detail: "support@arenax.com",
      sub: "Response within 2 hours",
      color: "text-blue-500",
      link: "mailto:support@arenax.com"
    },
    {
      icon: <MapPin size={24} />,
      title: "Main Office",
      detail: "Saiyedwada, Surat",
      sub: "Gujarat, India - 395003",
      color: "text-purple-500",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase mb-3 block"
          >
            Get In Touch
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
            Contact <span className="text-blue-600">ArenaX</span> Support
          </h1>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-medium">
            Have questions about a booking or want to list your turf? Reach out to our team anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT SIDE: CONTACT INFO (2 Cols) */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {contactMethods.map((method, i) => (
              <motion.a
                href={method.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center ${method.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                  {method.icon}
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{method.title}</h4>
                  <p className="text-lg font-black tracking-tight">{method.detail}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">{method.sub}</p>
                </div>
              </motion.a>
            ))}

            {/* QUICK HINT CARD */}
            <div className="p-8 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-600/20 hidden lg:block">
               <MessageSquare className="mb-4 opacity-50" size={32} />
               <h3 className="text-xl font-black uppercase leading-tight mb-2">Instant <br/>Booking Support</h3>
               <p className="text-blue-100 text-xs font-bold uppercase tracking-wider leading-relaxed">Our agents are online to help you with slot cancellations or modifications.</p>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM (3 Cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-xl"
          >
            {!user && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                <p className="text-yellow-400 text-sm font-medium text-center">
                  🔒 Please login to send us a message. This helps us provide better support!
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Your Name</label>
                  <input 
                    type="text" required placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Phone Number</label>
                  <input 
                    type="tel" required placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Email (Optional)</label>
                  <input 
                    type="email" placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Select Purpose</label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none pr-12"
                      value={formData.turf} onChange={(e) => setFormData({...formData, turf: e.target.value})}
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Booking Issue">Booking Issue</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-2">Message</label>
                <textarea 
                  rows="4" required placeholder="How can we help you today?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all resize-none"
                  value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={!user}
                className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all shadow-xl hover:-translate-y-[2px] active:scale-[0.98] ${
                  user 
                    ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-blue-600/20" 
                    : "bg-gray-800 text-gray-600 cursor-not-allowed"
                }`}
              >
                {user ? "Send Message" : "Login Required to Send Message"} <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;