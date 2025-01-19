const { validationResult } = require("express-validator");
const productsModel = require("../models/product_model");
const ownersModel = require("../models/owner_model");
const ProductService = require("../services/product.service");

const CreateProduct = async (req, res) => {
  try {
    const {
      product_name,
      price,
      discount,
      image,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
      owner_id,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const owner = await ownersModel.findById(owner_id);
    if (!owner) {
      throw new Error("Invalid owner_id");
    }
    const existingProduct = await productsModel.findOne({
      product_name: { $regex: new RegExp(`^${product_name}$`, "i") },
      category,
      price,
    });

    if (existingProduct) {
      return res.status(400).json({
        message:
          "Duplicate product found. This product already exists in the same category and with the same price.",
        data: existingProduct,
      });
    }

    const newProduct = await ProductService.CreateProduct({
      product_name,
      price,
      discount,
      image,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
      owner_id,
    });
    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = CreateProduct;
