//app export
const express = require("express");

//middlewares
const cors = require("cors");
const bodyParser = require("body-parser");

//env var setup
require("dotenv").config();

//auth exports
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

//routes
const expenseRoutes = require("./routes/expenses");
const incomeRoutes = require("./routes/income");
const duesRoutes = require("./routes/dues");
const authRoutes = require("./routes/auth");
const filterRoutes = require("./routes/filter");
const summaryRoutes = require("./routes/summary");

//app
const app = express();

//middlewares setup
app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//api
app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/dues", duesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/filter", filterRoutes);
app.use("/api/summary", summaryRoutes);

module.exports = app;
