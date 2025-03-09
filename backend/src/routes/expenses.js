const express = require("express");
const db = require("../models");
const { default: messages } = require("../constants/messages");

const router = express.Router();

// ➤ Create Expense
router.post("/", async (req, res) => {
  try {
    const { description, amount, type, included_in_total } = req.body;
    if (!description || !amount || !type || !included_in_total) {
      return res.status(400).json({
        success: false,
        message: messages.detailsNotEntered,
      });
    }
    const newExpense = await db.Expense.create({
      description,
      amount,
      type,
      included_in_total,
    });
    if (!newExpense) {
      res
        .status(401)
        .json({ success: false, message: messages.dataCreationUnsuccessful });
    }
    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: newExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: messages.internalServerError,
    });
  }
});

// ➤ Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await db.Expense.findAll();
    if (!expenses) {
      res
        .status(401)
        .json({ success: false, message: messages.dataGettingUnsuccessful });
    }
    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: expenses,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, messages: messages.internalServerError });
  }
});

// ➤ Get Single Expense by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res
        .status(400)
        .json({ success: false, message: messages.paramsNotFound });
    }
    const expense = await db.Expense.findByPk(id);
    if (!expense)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });
    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: expense,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, messages: messages.internalServerError });
  }
});

// ➤ Update Expense
router.put("/:id", async (req, res) => {
  try {
    const { description, amount, type, included_in_total } = req.body;
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await expense.update({ description, amount, type, included_in_total });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error updating expense" });
  }
});

// ➤ Delete Expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    await expense.destroy();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting expense" });
  }
});

module.exports = router;
