import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function TurfDetails() {
  const { id } = useParams();

  const [turf, setTurf] = useState(null);
  const [date, setDate] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  // fetch turf
  useEffect(() => {
    API.get(`/turfs/${id}`).then(res => setTurf(res.data));
  }, [id]);

  // fetch bookings for date
  useEffect(() => {
    if (date) {
      API.get(`/bookings/${id}?date=${date}`)
        .then(res => setBookedSlots(res.data));
    }
  }, [date, id]);

  const handleBooking = async () => {
    if (!selectedSlot || !date) {
      return toast.error("Select date & slot");
    }

    try {
      await API.post("/bookings", {
        turfId: id,
        date,
        slot: selectedSlot
      });

      toast.success("Booked successfully 🔥");

      // update UI instantly
      setBookedSlots(prev => [...prev, selectedSlot]);
      setSelectedSlot("");

    } catch {
      toast.error("Booking failed ❌");
    }
  };

  if (!turf) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      <h1 className="text-3xl mb-4">{turf.name}</h1>
      <p className="text-gray-400">{turf.location}</p>

      {/* DATE */}
      <input
        type="date"
        className="mt-4 p-2 bg-white/10 rounded"
        onChange={(e) => setDate(e.target.value)}
      />

      {/* SLOTS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {turf.slots.map((slot, i) => {
          const isBooked = bookedSlots.includes(slot);

          return (
            <button
              key={i}
              disabled={isBooked}
              onClick={() => setSelectedSlot(slot)}
              className={`p-3 rounded-xl transition-all
                ${isBooked ? "bg-red-500 cursor-not-allowed"
                  : selectedSlot === slot
                  ? "bg-green-500"
                  : "bg-white/10 hover:bg-white/20"}`}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* BOOK BUTTON */}
      <button
        onClick={handleBooking}
        className="mt-6 bg-blue-500 px-6 py-3 rounded-xl"
      >
        Book Now
      </button>
    </div>
  );
}

export default TurfDetails;