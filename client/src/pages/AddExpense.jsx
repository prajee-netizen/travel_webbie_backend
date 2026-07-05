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

      alert("Expense Added Successfully!");

      navigate(`/expenses/${tripId}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="container">
      <h1>Add Expense 💰</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={expense.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Hotel">🏨 Hotel</option>
          <option value="Flight">✈️ Flight</option>
          <option value="Food">🍔 Food</option>
          <option value="Transport">🚕 Transport</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Other">📦 Other</option>
        </select>

        <br /><br />

        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default AddExpense;