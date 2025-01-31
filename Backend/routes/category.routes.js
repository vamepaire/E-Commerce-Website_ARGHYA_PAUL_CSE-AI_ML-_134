const express = require("express");
const router = express.Router();
const productsModel = require("../models/product_model");

router.get("/:category", async (req, res) => {
  try {
    const type = req.params.category;
    if (!type) {
      return res.status(400).json({ message: "Invalid category!" });
    }

    const category = type.charAt(0).toUpperCase() + type.slice(1);
    const products = await productsModel.find({ category });

    if (!products) {
      return res
        .status(404)
        .json({ message: `No ${category} products found!` });
    }

    res.status(200).json({
      message: "Product Found",
      category: category,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: `Error fetching ${category}!` });
  }
});

module.exports = router;
