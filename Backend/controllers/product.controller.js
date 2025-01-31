const { validationResult } = require("express-validator");
const productsModel = require("../models/product_model");
const ownersModel = require("../models/owner_model");
const ProductService = require("../services/product.service");
const mongoose = require("mongoose");

const CreateProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No image uploaded" });
    }
    const imageBuffer = req.file.buffer;
    const imageName = req.file.originalname;
    const imageMimeType = req.file.mimetype;
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

    if (existingProduct && existingProduct.owner_id === owner.id) {
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
      image: {
        data: imageBuffer,
        contentType: imageMimeType,
        name: imageName,
      },
      bgcolor,
      panel_color,
      text_color,
      shop_name: req.Owner.Shop_name,
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

    // Check if an image file is uploaded
    let imageData = null;
    if (req.file) {
      imageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        name: req.file.originalname,
      };
    }

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format." });
    }

    const existingProduct = await productsModel.findById(id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Verify ownership
    if (req.Owner.id !== existingProduct.owner_id.toString()) {
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

    // Update product fields
    const updatedFields = {
      product_name,
      price,
      discount,
      bgcolor,
      panel_color,
      text_color,
      category,
      product_desc,
    };

    // Include image data if a new image is uploaded
    if (imageData) {
      updatedFields.image = imageData;
    }

    const updatedProduct = await productsModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
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
      .json({ message: "Internal Server Error", error: err.message });
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
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.owner_id.toString() !== req.Owner.id) {
      return res.status(403).json({
        message:
          "Not Authorized : You Are not Authorized to read the Product..",
      });
    }

    return res.status(200).json({ Message: "Your Product Data:", product });
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
async function findProduct(req, res) {
  try {
    const character = req.params.character;
    if (!character) {
      return res.status(400).json({ message: "Character is required." });
    }

    const regexp = new RegExp(`${character}`, "i");
    const products = await productsModel.find({ product_name: regexp });
    res.status(200).json({
      message: "Related Products Found",
      products: Object.keys(products).length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
}
module.exports = {
  CreateProduct,
  UpdateProduct,
  ReadProduct,
  DeleteProduct,
  findProduct,
};
