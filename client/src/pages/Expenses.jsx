import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function Expenses() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get(`/expenses/${tripId}`);

      setTrip(res.data.trip);
      setExpenses(res.data.expenses);
      setTotalExpense(res.data.totalExpense);
    } catch (error) {
      console.log(error);
      alert("Failed to load expenses");
    }
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete expense");
    }
  };

  return (
    <div className="container">

      <h1>💰 {trip} Expenses</h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "25px",
        }}
      >
        Keep track of every rupee spent during your trip.
      </p>

      <div className="stats-grid">

        <div className="card">
          <h2>💸 Total Spent</h2>

          <div className="stat-number">
            ₹{totalExpense.toLocaleString()}
          </div>

          <div className="stat-title">
            Overall Expenses
          </div>
        </div>

        <div className="card">
          <h2>🧾 Records</h2>

          <div className="stat-number">
            {expenses.length}
          </div>

          <div className="stat-title">
            Expense Entries
          </div>
        </div>

      </div>

      <br />

      <Link to={`/add-expense/${tripId}`}>
        <button>➕ Add Expense</button>
      </Link>

      <br />
      <br />

      {expenses.length === 0 ? (
        <div className="trip-card">
          <h2>No Expenses Yet 💳</h2>
          <p>Add your first expense to start tracking.</p>
        </div>
      ) : (
        expenses.map((expense) => (
          <div className="expense-card" key={expense._id}>

            <h2>{expense.title}</h2>

            <div className="trip-info">

              <p>
                💰 <strong>Amount:</strong> ₹
                {expense.amount.toLocaleString()}
              </p>

              <p>
                🏷 <strong>Category:</strong> {expense.category}
              </p>

            </div>

            <div className="trip-buttons">

              <button
                onClick={() =>
                  navigate(`/edit-expense/${tripId}/${expense._id}`)
                }
              >
                ✏️ Edit
              </button>

              <button
                style={{
                  background: "#ef4444",
                }}
                onClick={() => deleteExpense(expense._id)}
              >
                🗑 Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Expenses;