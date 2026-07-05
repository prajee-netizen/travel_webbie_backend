const express = require("express");
const router = express.Router();

const {
  createExpense,
  getTripExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createExpense);

router.get("/:tripId", protect, getTripExpenses);

router.put("/:id", protect, updateExpense);

router.delete("/:id", protect, deleteExpense);

module.exports = router;