const express = require("express");
const db = require("../../models");
const { Op } = require("sequelize");
const { default: messages } = require("../constants/messages");

const router = express.Router();

// ➤ Filter Expenses & Income
router.get("/", async (req, res) => {
  try {
    const { category, type, minAmount, maxAmount, description, included } =
      req.query;

    if (!category || (category !== "expense" && category !== "income")) {
      return res.status(400).json({
        success: false,
        message: messages.invalidCategory,
      });
    }

    const Model = category === "expense" ? db.Expense : db.Income;

    const whereClause = {};

    if (type) whereClause.type = type;
    if (minAmount)
      whereClause.amount = {
        ...whereClause.amount,
        [Op.gte]: parseFloat(minAmount),
      };
    if (maxAmount)
      whereClause.amount = {
        ...whereClause.amount,
        [Op.lte]: parseFloat(maxAmount),
      };
    if (description)
      whereClause.description = {
        [Op.like]: `%${description}%`,
      };
    if (included !== undefined)
      whereClause.included_in_total = included === "true";

    const filteredResults = await Model.findAll({ where: whereClause });

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: filteredResults,
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
