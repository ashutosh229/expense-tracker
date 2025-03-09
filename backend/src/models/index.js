const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

const User = require("./User");
const Expense = require("./Expense");
const Income = require("./Income");
const Due = require("./Due");

// Sync models with the database
sequelize
  .sync({ alter: true }) // Ensures models update without data loss
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

module.exports = { sequelize, User, Expense, Income, Due };
