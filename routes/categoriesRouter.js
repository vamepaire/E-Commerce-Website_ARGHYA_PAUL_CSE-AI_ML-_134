const express = require("express");
const route = express.Router();
const productsModel = require("../models/product_model");
const upload = require("../config/multer-config");
const ownerModel = require("../models/owner_model");
const isLoggedin = require("../middlewares/user.isLoggedin");
const user_model = require("../models/user_model");

route.get("/:category", isLoggedin, async (req, res) => {
  try {
    let user = await user_model.findOne({ email: req.user.email });
    const type = req.params.category;
    const category = type.charAt(0).toUpperCase() + type.slice(1);
    const products = await productsModel.find({ category });

    res.render("categoriesPage", {
      category: category,
      product: products,
      flag: false,
      cart: user.cart,
      wishlist: user.wishlist,
      orders: user.orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: `Error fetching ${category}!` });
  }
});

module.exports = route;
