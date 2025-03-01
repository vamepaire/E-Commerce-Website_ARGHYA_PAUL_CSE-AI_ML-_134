const { selectFields } = require("express-validator/lib/field-selection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
  User_name: {
    type: String,
    required: true,
  },
  Shop_name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product_Model",
    },
  ],
  image: {
    type: String,
  },
  gstIn: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
});

ownerSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET);
  return token;
};

ownerSchema.statics.generatePassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

ownerSchema.methods.verifyPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

module.exports = mongoose.model("Owner_Model", ownerSchema);
