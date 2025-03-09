const app = require("./app");
const db = require("../models");

const PORT = process.env.PORT || 5000;

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
