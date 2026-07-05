import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditExpense() {
  const { expenseId, tripId } = useParams();
  const navigate = useNavigate();

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const res = await API.get(`/expenses/${tripId}`);

      const selectedExpense = res.data.expenses.find(
        (exp) => exp._id === expenseId
      );

      if (selectedExpense) {
        setExpense({
          title: selectedExpense.title,
          amount: selectedExpense.amount,
          category: selectedExpense.category,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load expense.");
    }
  };

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/expenses/${expenseId}`, expense);

      alert("🎉 Expense Updated Successfully!");

      navigate(`/expenses/${tripId}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update expense");
    }
  };

  return (
    <div className="container">

      <div className="form-container">

        <h1>✏️ Edit Expense</h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          Update your expense details and keep your travel budget accurate.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>📝 Expense Title</label>

            <input
              type="text"
              name="title"
              placeholder="Expense Title"
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

            <p
              style={{
                marginTop: "10px",
                color: "#cbd5e1",
              }}
            >
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
              💾 Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditExpense;