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
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Model", // Reference to the Product model
    },
  ],
  image: {
    type: String,
  },
  gstIn: {
    type: String,
  },
});

module.exports = mongoose.model("Owner_Model", ownerSchema);
