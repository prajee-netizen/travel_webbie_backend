import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddTrip() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    notes: "",
  });

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/trips", trip);

      alert("🎉 Trip Added Successfully!");

      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed to add trip");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>✈️ Plan Your Next Adventure</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Fill in your travel details and start planning your journey.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>🌍 Destination</label>

            <input
              type="text"
              name="destination"
              placeholder="e.g. Tokyo, Japan"
              value={trip.destination}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>📅 Start Date</label>

            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🏁 End Date</label>

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>💰 Budget (₹)</label>

            <input
              type="number"
              name="budget"
              placeholder="Enter your travel budget"
              value={trip.budget}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>📝 Notes</label>

            <textarea
              name="notes"
              placeholder="Hotels, places to visit, reminders..."
              value={trip.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">
              🚀 Create Trip
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default AddTrip;