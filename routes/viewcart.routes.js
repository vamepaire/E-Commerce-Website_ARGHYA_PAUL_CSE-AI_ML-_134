const express = require("express");
const router = express.Router();
const UserisLoggedIn = require("../middlewares/user.isLoggedin");
const {
  getCart,
  removeFromCart,
  addToCart,
} = require("../controllers/cart.controller");

router.get("/", UserisLoggedIn, getCart);
router.delete("/remove/:id", UserisLoggedIn, removeFromCart);
router.post("/addToCart/:id", UserisLoggedIn,addToCart);

module.exports = router;
