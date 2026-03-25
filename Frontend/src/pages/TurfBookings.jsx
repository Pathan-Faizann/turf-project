import { useEffect, useState } from "react";
import API from "../services/api";

function TurfBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/bookings").then(res => setBookings(res.data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl mb-6">Bookings</h2>

      {bookings.map(b => (
        <div key={b._id} className="bg-white/5 p-4 mb-3 rounded">
          <h3 className="text-xl font-bold mb-2">{b.turf?.name}</h3>
          <p className="text-gray-400 mb-1">📍 {b.turf?.location}</p>
          <p className="text-gray-300">📅 {b.date}</p>
          <p className="text-gray-300">⏰ {b.slot}</p>
        </div>
      ))}
    </div>
  );
}

export default TurfBookings;