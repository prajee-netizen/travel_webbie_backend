import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    notes: "",
  });

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get("/trips");

      const selectedTrip = res.data.find((t) => t._id === id);

      if (selectedTrip) {
        setTrip({
          destination: selectedTrip.destination,
          startDate: selectedTrip.startDate.substring(0, 10),
          endDate: selectedTrip.endDate.substring(0, 10),
          budget: selectedTrip.budget,
          notes: selectedTrip.notes || "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Unable to load trip details.");
    }
  };

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/trips/${id}`, trip);

      alert("🎉 Trip Updated Successfully!");

      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed to update trip.");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>✏️ Edit Trip</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Update your travel plan whenever your journey changes.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>🌍 Destination</label>

            <input
              type="text"
              name="destination"
              placeholder="Destination"
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
              placeholder="Enter Budget"
              value={trip.budget}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>📝 Notes</label>

            <textarea
              name="notes"
              placeholder="Update your travel notes..."
              value={trip.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit">
              💾 Save Changes
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTrip;