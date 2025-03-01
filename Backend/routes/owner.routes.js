const express = require("express");
const router = express.Router();
const {
  OwnerRegistrationValidator,
  OwnerLoginValidator,
} = require("../validator/owner.validator");

const {
  OwnerRegistration,
  OwnerLogin,
  OwnerlogOut,
} = require("../controllers/owner.controller");
const OwnerisLoggedin = require("../middlewares/owner.isLoggedIn");
const measureMiddleware = (middleware) => {
  return (req, res, next) => {
    const start = Date.now();
    middleware(req, res, () => {
      const duration = Date.now() - start;
      console.log(
        `${middleware.name || "Anonymous Middleware"} - ${duration}ms`
      );
      next();
    });
  };
};

router.post("/register", OwnerRegistrationValidator, OwnerRegistration);
router.post("/login", OwnerLoginValidator, OwnerLogin);
router.get("/logout", OwnerisLoggedin, OwnerlogOut);

// router.get("/logout", isLoggedin, ownerlogOut);
// router.get("/admin", isLoggedin, async (req, res) => {
//   let message = req.flash("message");
//   res.render("createProduct", { message: message });
// });

// router.get("/", async (req, res) => {
//   res.render("ownerSignupPage", { message: req.flash("message") });
// });

// router.get("/ownersPage", isLoggedin, async (req, res) => {
//   let owner = await ownerModel
//     .findOne({ email: req.user.email })
//     .populate("product");
//   let ownersProduct = owner?.product || [];
//   let user = await ownerModel.findOne({ email: req.user.email });

//   res.render("ownersViewPage", {
//     user: user,
//     ownersProduct: ownersProduct,
//   });
// });

// router.get("/:id", isLoggedin, async function (req, res) {
//   try {
//     const { id } = req.params;

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).send({ message: "Invalid product ID" });
//     }

//     let product = await productsModel.findById(id);
//     if (!product) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     let user = await user_model.findOne({ email: req.user.email });

//     res.render("ownersProductView", {
//       product: product,
//       user: user,
//     });
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     res.status(500).send({ message: "Error fetching product" });
//   }
// });
// router.get("/update/:id", isLoggedin, async function (req, res) {
//   const { id } = req.params;

//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({ message: "Invalid product ID" });
//   }

//   let product = await productsModel.findOne({ _id: id });

//   if (!product) {
//     return res.status(404).send({ message: "Product not found" });
//   }

//   res.render("updateProduct", { product: product });
// });
// router.post(
//   "/update/:id",
//   isLoggedin,
//   upload.single("image"),
//   async function (req, res) {
//     try {
//       let updatedFields = req.body;
//       if (req.file) {
//         updatedFields.image = req.file.buffer; // Assuming 'image' is the field in your product model for the image
//       }

//       const updatedProduct = await productsModel.findOneAndUpdate(
//         { _id: req.params.id },
//         updatedFields,
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).send("Product not found");
//       }

//       // Redirect or send a success response
//       res.redirect("/owners/ownersPage");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error updating product");
//     }
//   }
// );

// router.post("/delete/:id", isLoggedin, async function (req, res) {
//   const { id } = req.params;

//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).send({ message: "Invalid product ID" });
//   }

//   try {
//     const deletedProduct = await productsModel.findOneAndDelete({
//       _id: id,
//     });

//     if (!deletedProduct) {
//       return res.status(404).send({ message: "Product not found" });
//     }

//     res.redirect("/owners/ownersPage");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error deleting product");
//   }
// });

// router.post("/register", ownersRegistrations);
// router.post("/login", ownersLogin);

module.exports = router;
