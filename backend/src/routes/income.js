const express = require("express");
const db = require("../../models");
const { default: messages } = require("../constants/messages");

const router = express.Router();

// ➤ Create Income
router.post("/", async (req, res) => {
  try {
    const { description, amount, type, included_in_total } = req.body;
    if (!description || !amount || !type || included_in_total === undefined) {
      return res.status(400).json({
        success: false,
        message: messages.detailsNotEntered,
      });
    }

    const newIncome = await db.Income.create({
      description,
      amount,
      type,
      included_in_total,
    });

    res.status(201).json({
      success: true,
      message: messages.successMessage,
      data: newIncome,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Get All Incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await db.Income.findAll();
    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: incomes,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Get Single Income by ID
router.get("/:id", async (req, res) => {
  try {
    const income = await db.Income.findByPk(req.params.id);
    if (!income)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: income,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Update Income
router.put("/:id", async (req, res) => {
  try {
    const { description, amount, type, included_in_total } = req.body;
    const income = await db.Income.findByPk(req.params.id);

    if (!income)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    await income.update({ description, amount, type, included_in_total });

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: income,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Delete Income
router.delete("/:id", async (req, res) => {
  try {
    const income = await db.Income.findByPk(req.params.id);
    if (!income)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    await income.destroy();
    res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

module.exports = router;
