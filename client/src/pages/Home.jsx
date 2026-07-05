import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            🌍 TravelWebbie
          </h1>

          <h2>
            Plan Smarter. Spend Better. Travel Further.
          </h2>

          <p>
            Organise your trips, manage your travel budget,
            track every expense and keep everything in one place.
            Whether it's a weekend getaway or your dream world tour,
            TravelWebbie helps you stay in control.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                 Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="secondary-btn">
                🔑 Login
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2> Why TravelWebbie?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="emoji">✈️</div>
            <h3>Trip Planner</h3>
            <p>
              Organise unlimited trips with destinations,
              dates, budgets and travel notes.
            </p>
          </div>

          <div className="feature-card">
            <div className="emoji">💰</div>
            <h3>Expense Tracker</h3>
            <p>
              Record every expense instantly and
              never lose track of your travel spending.
            </p>
          </div>

          <div className="feature-card">
            <div className="emoji">📊</div>
            <h3>Budget Dashboard</h3>
            <p>
              View total trips, total budget,
              spending and remaining balance at a glance.
            </p>
          </div>

          <div className="feature-card">
            <div className="emoji">📱</div>
            <h3>Simple & Fast</h3>
            <p>
              A clean interface designed for travellers,
              students and professionals alike.
            </p>
          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="stats">

        <div className="stat-box">
          <h1>∞</h1>
          <p>Unlimited Trips</p>
        </div>

        <div className="stat-box">
          <h1>₹</h1>
          <p>Budget Tracking</p>
        </div>

        <div className="stat-box">
          <h1>24/7</h1>
          <p>Access Anywhere</p>
        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>
          Ready for your next adventure?
        </h2>

        <p>
          Join TravelWebbie today and make every journey organised,
          memorable and stress-free.
        </p>

        <Link to="/register">
          <button className="primary-btn">
             Start Planning Now
          </button>
        </Link>

      </section>

    </div>
  );
}

export default Home;