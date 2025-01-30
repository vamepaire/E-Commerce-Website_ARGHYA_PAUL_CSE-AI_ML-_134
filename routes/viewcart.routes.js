const express = require("express");
const router = express.Router();
const UserisLoggedIn = require("../middlewares/user.isLoggedin");
const {
  getCart,
  removeFromCart,
  addToCart,
  incrementProduct,
  decrementProduct,
} = require("../controllers/cart.controller");

router.get("/", UserisLoggedIn, getCart);
router.delete("/remove/:id", UserisLoggedIn, removeFromCart);
router.post("/addToCart/:id", UserisLoggedIn, addToCart);
router.put("/incrementProduct/:id", UserisLoggedIn, incrementProduct);
router.put("/decrementProduct/:id", UserisLoggedIn, decrementProduct);

module.exports = router;
