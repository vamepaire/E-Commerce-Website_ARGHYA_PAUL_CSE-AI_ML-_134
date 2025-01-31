const productModel = require("../models/product_model");

async function filterProduct(req, res) {
  try {
    const query = {};
    const filters = req.body;
    if (filters.price) {
      query.price = { $in: filters.price };
    }

    if (filters.category) {
      query.category = { $in: filters.category };
    }

    const sortField = filters.sortBy || "price";
    const sortOrder = filters.sortOrder === "asc" ? 1 : -1;
    const products = await productModel
      .find(query)
      .sort({ [sortField]: sortOrder });

    res.status(200).json({
      message: "Filtered Products Found",
      products: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
}

module.exports = { filterProduct };
