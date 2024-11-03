const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:Mongoose");


mongoose
  .connect(`${config.get("MONGO_URI")}/Bag_Website`)
  .then(() => dbgr("connection successful"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
