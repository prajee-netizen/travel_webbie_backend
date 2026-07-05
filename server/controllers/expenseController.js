const Expense = require("../models/Expense");
const Trip = require("../models/Trip");

// Create Expense
const createExpense = async (req, res) => {
  try {
    const { tripId, title, amount, category } = req.body;

    // Validation
    if (!tripId || !title || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if trip exists and belongs to logged-in user
    const trip = await Trip.findOne({
      _id: tripId,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // Create Expense
    const expense = new Expense({
      trip: tripId,
      title,
      amount,
      category,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully!",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Expenses of a Trip
const getTripExpenses = async (req, res) => {
  try {
    // Check if trip belongs to logged-in user
    const trip = await Trip.findOne({
      _id: req.params.tripId,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    // Fetch expenses
    const expenses = await Expense.find({
      trip: req.params.tripId,
    });

    // Calculate total expense
    const totalExpense = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    res.status(200).json({
      trip: trip.destination,
      expenses,
      totalExpense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    expense.title = req.body.title || expense.title;
    expense.amount = req.body.amount || expense.amount;
    expense.category = req.body.category || expense.category;

    const updatedExpense = await expense.save();

    res.status(200).json({
      message: "Expense updated successfully!",
      expense: updatedExpense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted successfully!",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createExpense,
  getTripExpenses,
  updateExpense,
  deleteExpense,
};