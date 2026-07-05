import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await API.get("/trips");
      setTrips(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load trips");
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      await API.delete(`/trips/${id}`);
      fetchTrips();
    } catch (error) {
      alert("Failed to delete trip");
    }
  };

  return (
    <div className="container">
      <h1>✈️ My Trips</h1>
      <p>Manage all your travel adventures in one place.</p>

      <br />

      <Link to="/add-trip">
        <button>➕ Add New Trip</button>
      </Link>

      {trips.length === 0 ? (
        <div className="trip-card">
          <h2>No trips yet 🌍</h2>
          <p>Create your first trip to get started.</p>
        </div>
      ) : (
        trips.map((trip) => (
          <div className="trip-card" key={trip._id}>
            <h2>📍 {trip.destination}</h2>

            <div className="trip-info">
              <p>📅 <strong>Start:</strong> {new Date(trip.startDate).toLocaleDateString()}</p>

              <p>🏁 <strong>End:</strong> {new Date(trip.endDate).toLocaleDateString()}</p>

              <p>💰 <strong>Budget:</strong> ₹{trip.budget.toLocaleString()}</p>

              <p>📝 <strong>Notes:</strong> {trip.notes || "No notes added"}</p>
            </div>

            <div className="trip-buttons">
              <Link to={`/expenses/${trip._id}`}>
                <button>💰 Expenses</button>
              </Link>

              <Link to={`/edit-trip/${trip._id}`}>
                <button>✏️ Edit</button>
              </Link>

              <button
                style={{ background: "#ef4444" }}
                onClick={() => deleteTrip(trip._id)}
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Trips;