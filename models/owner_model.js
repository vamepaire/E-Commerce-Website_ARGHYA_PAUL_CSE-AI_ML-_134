const mongoose = require("mongoose");
const ownerSchema = new mongoose.Schema({
  User_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  product: {
    type: Array,
    default: [],
  },
  image: {
    type: String,
  },
  gstIn: {
    type: String,
  },
});

module.exports = mongoose.model("Owner_Model", ownerSchema);
