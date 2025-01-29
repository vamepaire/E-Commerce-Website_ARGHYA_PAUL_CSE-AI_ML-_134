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
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    name: { type: String, required: true },
  },
  bgcolor: {
    type: String,
  },
  panel_color: {
    type: String,
  },
  text_color: {
    type: String,
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
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner_Model", // Reference to the Owner_Model
    required: true,
  },
});

module.exports = mongoose.model("Product_Model", ProductSchema);
