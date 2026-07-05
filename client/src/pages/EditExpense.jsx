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
      alert("Failed to load expense");
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

      alert("Expense Updated Successfully!");

      navigate(`/expenses/${tripId}`);
    } catch (error) {
      console.log(error);
      alert("Failed to update expense");
    }
  };

  return (
    <div className="container">
      <h1>Edit Expense</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={expense.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="amount"
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
          <option value="">Select Category</option>
          <option value="Hotel">Hotel</option>
          <option value="Flight">Flight</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <br /><br />

        <button type="submit">
          Update Expense
        </button>
      </form>
    </div>
  );
}

export default EditExpense;