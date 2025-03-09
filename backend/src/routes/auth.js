const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const db = require("../../models");
require("dotenv").config();

const router = express.Router();

const User = db.user;

// 🔹 Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.json({ success: true, message: "User registered", user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// 🔹 Login Route
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ success: false, message: info?.message || "Login failed" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, message: "Login successful", token });
  })(req, res, next);
});

// 🔹 Protected Route Example
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({ success: true, user: req.user });
  }
);

module.exports = router;
