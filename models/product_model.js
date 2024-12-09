const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: Buffer,
    required: true,
  },
  bgcolor: {
    type: String,
    // required: true
  },
  panel_color: {
    type: String,
    // required: true
  },
  text_color: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    enum: ["Fashion", "Grocery", "Electronics", "Home & Furniture", "Mobile"],
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product_Model", ProductSchema);
