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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/expenses/${id}`);

      alert("Expense deleted successfully!");

      fetchExpenses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete expense");
    }
  };

  return (
    <div className="container">
      <h1>{trip} Expenses 💰</h1>

      <br />

      <Link to={`/add-expense/${tripId}`}>
        <button>Add Expense</button>
      </Link>

      <br />
      <br />

      {expenses.length === 0 ? (
        <h3>No Expenses Found</h3>
      ) : (
        expenses.map((expense) => (
          <div className="trip-card" key={expense._id}>
            <h3>{expense.title}</h3>

            <p>
              <strong>Amount:</strong> ₹{expense.amount}
            </p>

            <p>
              <strong>Category:</strong> {expense.category}
            </p>

            <button
              onClick={() =>
                navigate(`/edit-expense/${tripId}/${expense._id}`)
              }
            >
              Edit
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteExpense(expense._id)}
            >
              Delete
            </button>

            <hr />
          </div>
        ))
      )}

      <br />

      <h2>Total Expenses: ₹{totalExpense}</h2>
    </div>
  );
}

export default Expenses;