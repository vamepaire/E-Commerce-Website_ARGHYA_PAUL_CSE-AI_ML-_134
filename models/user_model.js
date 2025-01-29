const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    select: false,
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product_Model",
        required: true,
      },
      quantity: {
        type: Number,
        default: 0,
      },
    },
  ],
  wishlist: [
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

UserSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

UserSchema.statics.generatePassword = async function (password) {
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

UserSchema.methods.verifyPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("User_Model", UserSchema);
