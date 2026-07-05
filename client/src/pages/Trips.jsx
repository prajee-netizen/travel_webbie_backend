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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/trips/${id}`);

      alert("Trip deleted successfully!");

      fetchTrips();
    } catch (error) {
      console.log(error);
      alert("Failed to delete trip");
    }
  };

  return (
    <div className="container">
      <h1>My Trips ✈️</h1>

      {trips.length === 0 ? (
        <h3>No Trips Found</h3>
      ) : (
        trips.map((trip) => (
          <div className="trip-card" key={trip._id}>
            <h2>{trip.destination}</h2>

            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(trip.startDate).toLocaleDateString()}
            </p>

            <p>
              <strong>End Date:</strong>{" "}
              {new Date(trip.endDate).toLocaleDateString()}
            </p>

            <p>
              <strong>Budget:</strong> ₹{trip.budget}
            </p>

            <p>
              <strong>Notes:</strong> {trip.notes}
            </p>

            <div style={{ marginTop: "15px" }}>
              <Link to={`/edit-trip/${trip._id}`}>
                <button>Edit</button>
              </Link>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTrip(trip._id)}
              >
                Delete
              </button>

              <Link to={`/expenses/${trip._id}`}>
                <button style={{ marginLeft: "10px" }}>
                  View Expenses
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Trips;