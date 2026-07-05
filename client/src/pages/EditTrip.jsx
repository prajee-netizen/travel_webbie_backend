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
          notes: selectedTrip.notes,
        });
      }
    } catch (error) {
      console.log(error);
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

      alert("Trip Updated Successfully!");

      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  return (
    <div className="container">
      <h1>Edit Trip</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="destination"
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
          value={trip.budget}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="notes"
          value={trip.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
}

export default EditTrip;