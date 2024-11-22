const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const productModel = require("../models/product_model");
const user_model = require("../models/user_model");

route.get("/", function (req, res) {
  let message = req.flash("message");
  console.log(message);
  res.render("index", { message: message });
});

route.get("/shopmate", isLoggedIn, async function (req, res) {
  try {
    let message = req.flash("message");
    let products = await productModel.find();
    res.render("shopmate", { product: products, message: message });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products" });
  }
});

route.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  try {
    // Find the user by email
    let user = await user_model.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

     if (user.cart.includes(req.params.id)) {
       req.flash("message", "Product already in cart");
       let products = await productModel.find();
       return res.render("shopmate", {
         product: products,
         message: req.flash("message"),
       });
     }
    user.cart.push(req.params.id);
    await user.save();

    req.flash("message", "Product added to cart");
    let message = req.flash("message");
    let products = await productModel.find();
    res.render("shopmate", { product: products, message: message });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).send({ message: "Error adding product to cart" });
  }
});

route.get("/cart", isLoggedIn, async (req, res) => {
  try {
    console.log(req.user.email);
    let user = await user_model
      .findOne({ email: req.user.email })
      .populate("cart");

    if (!user || !user.cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    let cartItems = user.cart;
    let totalPrice = cartItems.reduce(
      (total, item) => total + (item.price || 0),
      0
    );
    res.render("cart" , { cartItems: cartItems , total: totalPrice});
    // res.status(200).send({ message:"Cart successfully Fetched" });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send({ message: "Error fetching cart" });
  }
});

route.get("/wishlist", isLoggedIn, async (req, res) => {
  try {
    let user = await user_model.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // res.render("wishlist");
    res.status(200).send({ message: "Wishlist successfully Fetched" });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).send({ message: "Error fetching wishlist" });
  }
});

route.get("/orders",isLoggedIn,  async (req, res)=>{
  try {
    let user = await user_model.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // res.render("orders");
    res.status(200).send({ message: "Orders successfully Fetched" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send({ message: "Error fetching orders" });
  }
})

module.exports = route;
