const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
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
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Model",
    },
  ],
  isAdmin: {
    type: Boolean,
  },
  orders: {
    type: Array,
    default: [],
  },
  contact_no: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports  = mongoose.model("User_Model", UserSchema);