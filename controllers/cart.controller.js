const userModel = require("../models/user_model");
const productsModel = require("../models/product_model");
const mongoose = require("mongoose");

async function getCart(req, res) {
  try {
    const user = await userModel.findById(req.user.id).populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Cart Fetched", cart: user.cart.length });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
}

async function removeFromCart(req, res) {
  try {
    const { id: productId } = req.params;
    const user = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { $pull: { cart: productId } }, // Remove product from cart
        { new: true } // Return updated user document
      )
      .populate("cart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Product removed from cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
}

async function addToCart(req, res) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await productsModel.findById(req.params.id);
    const user = await userModel.findById(req.user.id);
    const cartItem = user.cart.find(
      (item) => item.productId.toString() === req.params.id
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (cartItem) {
      await userModel.findByIdAndUpdate(
        req.user.id,
        { $inc: { "cart.$[elem].quantity": 1 } },
        {
          arrayFilters: [{ "elem.productId": req.params.id }],
          new: true,
        }
      );
    } else {
      await userModel.findByIdAndUpdate(
        req.user.id,
        { $push: { cart: { productId: req.params.id, quantity: 1 } } },
        { new: true }
      );
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.redirect("/viewcart");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
}
module.exports = { getCart, removeFromCart, addToCart };
