const express = require("express");
const router = express.Router();
const productsModel = require("../models/product_model");
const upload = require("../config/multer-config");
const isLoggedIn = require("../middlewares/isLoggedin");
const user_model = require("../models/user_model");
const ownersModel = require("../models/owner_model");

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {
  try {
    const {
      product_name,
      price,
      discount,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
    } = req.body;

    // Check for valid category
    if (
      ![
        "Fashion",
        "Grocery",
        "Electronics",
        "Mobile",
        "Home & Furniture",
      ].includes(category)
    ) {
      return res.status(400).send("Invalid category");
    }

    // Create the product
    const product = await productsModel.create({
      product_name,
      price,
      image: req.file.buffer,
      discount,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
    });
    // Find the owner (assume the owner's ID is in `req.user._id` from session/auth)
    const owner = await ownersModel.findById(req.user.id);

    if (!owner) {
      return res.status(404).send("Owner not found");
    }

    // Add the product ID to the owner's product array
    owner.product.push(product.id);

    // Save the updated owner document
    await owner.save();

    // Flash a success message and redirect
    req.flash("message", "Product created successfully!");
    res.redirect("/owners/ownersPage");
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).send({ error: err.message });
  }
});

router.get("/:id", isLoggedIn, async function (req, res) {
  try {
    const { id } = req.params;
    let product = await productsModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    let user = await user_model.findOne({ email: req.user.email });
    let isInCart = user.cart.some((cartItemId) => cartItemId.toString() === id);
    // console.log(isInCart);

    res.render("productCard", {
      product: product,
      user: user,
      isInCart: isInCart,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Error fetching product" });
  }
});

router.post("/:id/wishlist", isLoggedIn, async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product exists
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    const user = await user_model.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { wishlist: productId } }, // Use $addToSet to avoid duplicates
      { new: true } // Return the updated user document
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    req.flash("success", "Product added to wishlist successfully!");
    res.redirect(`/products/${productId}`);
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).send({ message: "Error adding product to wishlist" });
  }
});

module.exports = router;
