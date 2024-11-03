const mongoose = require('mongoose')

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
        type: String,
        required: true,
    },
    bgcolor: {
        type: String,
        required: true
    },
    panel_color: {
        type: String,
        required: true
    },
    text_color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Product_Model", ProductSchema);