import { useEffect, useState } from "react";
import API from "../services/api";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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
    return (
      <div className="container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  const data = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [
          dashboard.totalSpent,
          dashboard.remainingBudget,
        ],
        backgroundColor: [
          "#ef4444",
          "#22c55e",
        ],
        borderColor: [
          "#ef4444",
          "#22c55e",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container">

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        📊 Dashboard
      </h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>✈ Total Trips</h3>
          <h1>{dashboard.totalTrips}</h1>
        </div>

        <div className="dashboard-card">
          <h3>💰 Total Budget</h3>
          <h1>₹{dashboard.totalBudget}</h1>
        </div>

        <div className="dashboard-card">
          <h3>💸 Total Spent</h3>
          <h1>₹{dashboard.totalSpent}</h1>
        </div>

        <div className="dashboard-card">
          <h3>💵 Remaining</h3>
          <h1>₹{dashboard.remainingBudget}</h1>
        </div>

      </div>

      <div
        className="dashboard-card"
        style={{
          marginTop: "50px",
          maxWidth: "650px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Budget Overview
        </h2>

        <Pie data={data} />
      </div>

    </div>
  );
}

export default Dashboard;