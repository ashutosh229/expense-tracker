import express from "express";
import passport from "passport";
const router = express.Router();
const { User } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out" });
});

module.exports = router;
