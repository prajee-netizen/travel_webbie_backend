import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    alert("Logged out successfully!");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <h2 className="logo">🌍 TravelVault</h2>

        <div className="nav-links">

          <Link to="/">Home</Link>

          {!token ? (
            <>
              <Link to="/login">Login</Link>

              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                👋 Hi, {name}
              </span>

              <Link to="/dashboard">Dashboard</Link>

              <Link to="/trips">Trips</Link>

              <Link to="/add-trip">Add Trip</Link>

              <button
                onClick={logout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;