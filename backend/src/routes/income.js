const express = require("express");
const router = express.Router();
const { Income } = require("../models");

// Create a new income entry
router.post("/", async (req, res) => {
  try {
    const income = await Income.create(req.body);
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: "Failed to add income" });
  }
});

// Get total income summary
router.get("/summary", async (req, res) => {
  try {
    const totalIncome = await Income.sum("amount", {
      where: { included_in_total: true },
    });
    res.json({ totalIncome });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch income summary" });
  }
});

// Get all income records
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.findAll();
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch income records" });
  }
});

// Update an income entry
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIncome = await Income.update(req.body, { where: { id } });
    res.json({ message: "Income updated successfully", updatedIncome });
  } catch (error) {
    res.status(500).json({ error: "Failed to update income" });
  }
});

// Delete an income entry
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Income.destroy({ where: { id } });
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete income" });
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
    if (description) whereClause.description = { $like: `%${description}%` };
    if (included !== undefined)
      whereClause.included_in_total = included === "true";

    const filteredIncome = await Income.findAll({ where: whereClause });
    res.json(filteredIncome);
  } catch (error) {
    res.status(500).json({ error: "Failed to filter income" });
  }
});

module.exports = router;
