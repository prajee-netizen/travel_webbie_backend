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

      alert("Trip Added Successfully!");

      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed to add trip");
    }
  };

  return (
    <div className="container">
      <h1>Add Trip ✈️</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={trip.budget}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={trip.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
}

export default AddTrip;