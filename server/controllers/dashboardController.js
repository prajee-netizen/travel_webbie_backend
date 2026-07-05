const Trip = require("../models/Trip");
const Expense = require("../models/Expense");

const getDashboard = async (req, res) => {
  try {
    // Get all trips of logged-in user
    const trips = await Trip.find({ user: req.user.id });

    // Total trips
    const totalTrips = trips.length;

    // Calculate total budget
    let totalBudget = 0;

    for (const trip of trips) {
      totalBudget += trip.budget;
    }

    // Get all trip IDs
    const tripIds = trips.map(trip => trip._id);

    // Get expenses of those trips
    const expenses = await Expense.find({
      trip: { $in: tripIds },
    });

    // Calculate total spent
    let totalSpent = 0;

    for (const expense of expenses) {
      totalSpent += expense.amount;
    }

    // Remaining budget
    const remainingBudget = totalBudget - totalSpent;

    res.status(200).json({
      totalTrips,
      totalBudget,
      totalSpent,
      remainingBudget,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};