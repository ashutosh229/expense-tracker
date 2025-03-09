const express = require("express");
const db = require("../../models");
const { default: messages } = require("../constants/messages");

const router = express.Router();

// ➤ Create Due
router.post("/", async (req, res) => {
  try {
    const { name, amount, description, type, settled } = req.body;
    if (!name || !amount || !description || !type || settled === undefined) {
      return res.status(400).json({
        success: false,
        message: messages.detailsNotEntered,
      });
    }

    const newDue = await db.Due.create({
      name,
      amount,
      description,
      type,
      settled,
    });

    res.status(201).json({
      success: true,
      message: messages.successMessage,
      data: newDue,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Get All Dues
router.get("/", async (req, res) => {
  try {
    const dues = await db.Due.findAll();
    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: dues,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Get Single Due by ID
router.get("/:id", async (req, res) => {
  try {
    const due = await db.Due.findByPk(req.params.id);
    if (!due)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: due,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Update Due
router.put("/:id", async (req, res) => {
  try {
    const { name, amount, description, type, settled } = req.body;
    const due = await db.Due.findByPk(req.params.id);

    if (!due)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    await due.update({ name, amount, description, type, settled });

    res.status(200).json({
      success: true,
      message: messages.successMessage,
      data: due,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

// ➤ Delete Due
router.delete("/:id", async (req, res) => {
  try {
    const due = await db.Due.findByPk(req.params.id);
    if (!due)
      return res
        .status(404)
        .json({ success: false, message: messages.dataNotFound });

    await due.destroy();
    res
      .status(200)
      .json({ success: true, message: "Due deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: messages.internalServerError });
  }
});

module.exports = router;
