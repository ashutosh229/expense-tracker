const express = require("express");
const db = require("../../models");
const { default: messages } = require("../constants/messages");

const router = express.Router();

// ➤ Get Financial Summary
router.get("/", async (req, res) => {
  try {
    // Fetch total income
    const totalIncome = await db.Income.sum("amount", {
      where: { included_in_total: true },
    });

    // Fetch total expenses
    const totalExpenses = await db.Expense.sum("amount", {
      where: { included_in_total: true },
    });

    // Fetch excluded income
    const excludedIncome = await db.Income.sum("amount", {
      where: { included_in_total: false },
    });

    // Fetch excluded expenses
    const excludedExpenses = await db.Expense.sum("amount", {
      where: { included_in_total: false },
    });

    // Fetch total borrowed dues
    const totalBorrowed = await db.Due.sum("amount", {
      where: { type: "borrowed", settled: false },
    });

    // Fetch total lent dues
    const totalLent = await db.Due.sum("amount", {
      where: { type: "lent", settled: false },
    });

    // Calculate total savings
    const totalSavings = (totalIncome || 0) - (totalExpenses || 0);

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: {
        totalIncome: totalIncome || 0,
        totalExpenses: totalExpenses || 0,
        totalSavings,
        excludedIncome: excludedIncome || 0,
        excludedExpenses: excludedExpenses || 0,
        totalBorrowed: totalBorrowed || 0,
        totalLent: totalLent || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: messages.internalServerError,
    });
  }
});

module.exports = router;
