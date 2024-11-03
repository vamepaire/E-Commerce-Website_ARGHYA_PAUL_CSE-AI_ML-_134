const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/User_model`)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
