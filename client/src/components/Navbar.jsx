import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#0f172a",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: "white" }}>🌍 TravelVault</h2>

      <div>
        <Link
          to="/"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/login"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Register
        </Link>

        <Link
          to="/dashboard"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/trips"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Trips
        </Link>

        <Link
          to="/add-trip"
          style={{ color: "white", textDecoration: "none" }}
        >
          Add Trip
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;