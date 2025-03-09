const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Import passport config

const expenseRoutes = require("./routes/expenses");
const incomeRoutes = require("./routes/income");
const duesRoutes = require("./routes/dues");
const authRoutes = require("./routes/auth"); // Import auth routes

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  session({
    secret: "123456789", // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/dues", duesRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

module.exports = app;
