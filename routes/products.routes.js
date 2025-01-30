const express = require("express");
const router = express.Router();
const productsModel = require("../models/product_model");
const upload = require("../config/multer-config");
const isLoggedIn = require("../middlewares/user.isLoggedin");
const user_model = require("../models/user_model");
const {
  CreateProduct,
  ReadProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/product.controller");
const ProductService = require("../services/product.service");
const {
  productValidation,
  validateImage,
  validate,
} = require("../validator/product.validation");
const OwnerisLoggedin = require("../middlewares/owner.isLoggedIn");
const UserisLoggedIn = require("../middlewares/user.isLoggedin");
const { findProduct } = require("../controllers/product.controller");

router.post(
  "/create-product",
  OwnerisLoggedin,
  ProductService.AddObjectId,
  upload,
  validateImage,
  productValidation,
  validate,
  CreateProduct
);

router.put(
  "/update-product/:id",
  OwnerisLoggedin,
  ProductService.AddObjectId,
  upload,
  validateImage,
  productValidation,
  validate,
  UpdateProduct
);
router.get("/product-description/:id", OwnerisLoggedin, ReadProduct);
router.delete("/delete-product/:id", OwnerisLoggedin, DeleteProduct);
router.get("/:character", UserisLoggedIn, findProduct);

// router.get("/:id", isLoggedIn, async function (req, res) {
//   try {
//     const { id } = req.params;
//     let product = await productsModel.findById(req.params.id);
//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }
//     let user = await user_model.findOne({ email: req.user.email });
//     let isInCart = user.cart.some((cartItemId) => cartItemId.toString() === id);
//     // console.log(isInCart);

//     res.render("productCard", {
//       product: product,
//       user: user,
//       isInCart: isInCart,
//     });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).send({ message: "Error fetching product" });
//   }
// });

// router.post("/:id/wishlist", isLoggedIn, async (req, res) => {
//   try {
//     const productId = req.params.id;

//     // Check if the product exists
//     const product = await productsModel.findById(productId);
//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     const user = await user_model.findByIdAndUpdate(
//       req.user.id,
//       { $addToSet: { wishlist: productId } }, // Use $addToSet to avoid duplicates
//       { new: true } // Return the updated user document
//     );

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     req.flash("success", "Product added to wishlist successfully!");
//     res.redirect(`/products/${productId}`);
//   } catch (error) {
//     console.error("Error adding product to wishlist:", error);
//     res.status(500).send({ message: "Error adding product to wishlist" });
//   }
// });

module.exports = router;
