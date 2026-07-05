import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import AddTrip from "./pages/AddTrip";
import EditTrip from "./pages/EditTrip";
import Expenses from "./pages/Expenses";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/edit-trip/:id" element={<EditTrip />} />
        <Route path="/expenses/:tripId" element={<Expenses />} />
        <Route path="/add-expense/:tripId" element={<AddExpense />} />
        <Route
          path="/edit-expense/:tripId/:expenseId"
          element={<EditExpense />}
        />
      </Routes>
    </>
  );
}

export default App;