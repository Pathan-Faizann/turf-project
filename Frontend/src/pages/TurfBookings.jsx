import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function TurfBookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      API.get("/bookings").then(res => setBookings(res.data));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Login First Please</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <h2 className="text-3xl mb-6">Bookings</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">No bookings yet</h3>
          <p className="text-gray-500 mb-6">Explore turfs and book your favorite spots now!</p>
          <Link to="/explore" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">Explore Turfs</Link>
        </div>
      ) : (
        bookings.map(b => (
          <div key={b._id} className="bg-white/5 p-4 mb-3 rounded">
            <h3 className="text-xl font-bold mb-2">{b.turf?.name}</h3>
            <p className="text-gray-400 mb-1">📍 {b.turf?.location}</p>
            <p className="text-gray-300">📅 {b.date}</p>
            <p className="text-gray-300">⏰ {b.slot}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default TurfBookings;