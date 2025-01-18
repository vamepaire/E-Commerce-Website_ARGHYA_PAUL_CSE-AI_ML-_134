const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");
const upload = require("../config/multer-config");
const mongoose = require("mongoose");
const productsModel = require("../models/product_model");
const {
  ownersRegistrations,
  ownersLogin,
  ownerlogOut,
  logOut,
} = require("../controllers/authController");
const isLoggedin = require("../middlewares/isLoggedin");
const user_model = require("../models/user_model");

router.get("/logout", isLoggedin, ownerlogOut);

router.post("/create", async (req, res) => {
  let owner = await ownerModel.find();
  if (owner.length > 0) {
    res
      .status(503)
      .send(
        "You don't have access to this page. Please contact admin for access"
      );
  } else {
    let createdOwner = await ownerModel.create({
      User_name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gstIn: req.body.gstIn,
    });
    res.status(200).send(createdOwner);
  }
});

router.get("/admin", isLoggedin, async (req, res) => {
  let message = req.flash("message");
  res.render("createProduct", { message: message });
});

router.get("/", async (req, res) => {
  res.render("ownerSignupPage", { message: req.flash("message") });
});

router.get("/ownersPage", isLoggedin, async (req, res) => {
  let owner = await ownerModel
    .findOne({ email: req.user.email })
    .populate("product");
  let ownersProduct = owner?.product || [];
  let user = await ownerModel.findOne({ email: req.user.email });
  

  res.render("ownersViewPage", {
    user: user,
    ownersProduct: ownersProduct,
  });
});

router.get("/:id", isLoggedin, async function (req, res) {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid product ID" });
    }

    let product = await productsModel.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    let user = await user_model.findOne({ email: req.user.email });

    res.render("ownersProductView", {
      product: product,
      user: user,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send({ message: "Error fetching product" });
  }
});
router.get("/update/:id", isLoggedin, async function (req, res) {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid product ID" });
  }

  let product = await productsModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.render("updateProduct", { product: product });
});
router.post(
  "/update/:id",
  isLoggedin,
  upload.single("image"),
  async function (req, res) {
    try {
      let updatedFields = req.body;
      if (req.file) {
        updatedFields.image = req.file.buffer; // Assuming 'image' is the field in your product model for the image
      }

      const updatedProduct = await productsModel.findOneAndUpdate(
        { _id: req.params.id },
        updatedFields,
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).send("Product not found");
      }

      // Redirect or send a success response
      res.redirect("/owners/ownersPage");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating product");
    }
  }
);

router.post("/delete/:id", isLoggedin, async function (req, res) {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await productsModel.findOneAndDelete({
      _id: id,
    });

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.redirect("/owners/ownersPage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting product");
  }
});

router.post("/register", ownersRegistrations);
router.post("/login", ownersLogin);

module.exports = router;
