import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");

      setDashboard(res.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load dashboard");
    }
  };

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard 📊</h1>

      <hr />

      <h2>Total Trips : {dashboard.totalTrips}</h2>

      <h2>Total Budget : ₹{dashboard.totalBudget}</h2>

      <h2>Total Spent : ₹{dashboard.totalSpent}</h2>

      <h2>Remaining Budget : ₹{dashboard.remainingBudget}</h2>
    </div>
  );
}

export default Dashboard;