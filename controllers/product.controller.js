const { validationResult } = require("express-validator");
const productsModel = require("../models/product_model");
const ownersModel = require("../models/owner_model");
const ProductService = require("../services/product.service");
const mongoose = require("mongoose");

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

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }
    const product_id = id.toString();

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const IfThisIsTheOwner = await productsModel.findById(product_id);

    if (!IfThisIsTheOwner) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Verify ownership
    if (req.Owner.id !== IfThisIsTheOwner.owner_id.toString()) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to perform this action.",
      });
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find the product by ID and update its fields
    const updatedProduct = await productsModel.findByIdAndUpdate(
      product_id,
      req.body,
      { new: true, runValidators: true } // Return updated document and run schema validators
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

const ReadProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }
    const product_id = id.toString();

    if (!mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const product = await productsModel.findById(product_id);
    if (product_id !== req.Owner.id) {
      return res.status(403).json({
        message:
          "Not Authorized : You Are not Authorized to read the Product..",
      });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    if (req.Owner.id !== product.owner_id.toString()) {
      return res.status(403).json({
        message:
          "Unauthorized: You do not have permission to delete this product.",
      });
    }

    const deletedProduct = await productsModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product deleted successfully.",
      deletedProduct,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = { CreateProduct, UpdateProduct, ReadProduct, DeleteProduct };
