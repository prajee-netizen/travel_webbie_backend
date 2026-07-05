import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function AddExpense() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/expenses", {
        tripId,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      });

      alert("🎉 Expense Added Successfully!");

      navigate(`/expenses/${tripId}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>💰 Add New Expense</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Record every expense to keep your trip budget under control.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>📝 Expense Title</label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Hotel Booking"
              value={expense.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>💵 Amount (₹)</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={expense.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>🏷 Category</label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Hotel">🏨 Hotel</option>
              <option value="Flight">✈️ Flight</option>
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚕 Transport</option>
              <option value="Shopping">🛍 Shopping</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#0f172a",
              borderRadius: "12px",
              border: "1px solid #334155",
            }}
          >
            <strong style={{ color: "#38bdf8" }}>
              💡 Available Categories
            </strong>

            <p style={{ marginTop: "10px", color: "#cbd5e1" }}>
              🏨 Hotel &nbsp; | &nbsp;
              ✈️ Flight &nbsp; | &nbsp;
              🍔 Food &nbsp; | &nbsp;
              🚕 Transport &nbsp; | &nbsp;
              🛍 Shopping &nbsp; | &nbsp;
              📦 Other
            </p>
          </div>

          <div className="form-actions">
            <button type="submit">
              ➕ Add Expense
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default AddExpense;