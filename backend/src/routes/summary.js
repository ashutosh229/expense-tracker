const express = require("express");
const router = express.Router();
const { Income, Expense } = require("../models");

// Get financial summary
router.get("/", async (req, res) => {
  try {
    const totalIncome = await Income.sum("amount", {
      where: { included_in_total: true },
    });
    const totalExpenditure = await Expense.sum("amount", {
      where: { included_in_total: true },
    });

    const excludedIncome = await Income.sum("amount", {
      where: { included_in_total: false },
    });
    const excludedExpenditure = await Expense.sum("amount", {
      where: { included_in_total: false },
    });

    res.json({
      totalIncome: totalIncome || 0,
      totalExpenditure: totalExpenditure || 0,
      totalSavings: (totalIncome || 0) - (totalExpenditure || 0),
      excludedIncome: excludedIncome || 0,
      excludedExpenditure: excludedExpenditure || 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch financial summary" });
  }
});

module.exports = router;
