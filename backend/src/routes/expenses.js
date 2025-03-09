const express = require("express");
const router = express.Router();
const { Expense } = require("../models");
const { Op } = require("sequelize");

// Update an existing expense
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.update(req.body, { where: { id } });
    res.json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { type, minAmount, maxAmount, description, included } = req.query;
    const whereClause = {};

    if (type) whereClause.type = type;
    if (minAmount)
      whereClause.amount = {
        ...whereClause.amount,
        $gte: parseFloat(minAmount),
      };
    if (maxAmount)
      whereClause.amount = {
        ...whereClause.amount,
        $lte: parseFloat(maxAmount),
      };
    if (description)
      whereClause.description = { [Op.iLike]: `%${description}%` };
    if (included !== undefined)
      whereClause.included_in_total = included === "true";

    const filteredExpenses = await Expense.findAll({ where: whereClause });
    res.json(filteredExpenses);
  } catch (error) {
    console.error("Error filtering expenses:", error);
    res.status(500).json({ error: "Failed to filter expenses" });
  }
});

module.exports = router;
