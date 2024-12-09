const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");
const {
  ownersRegistrations,
  ownersLogin,
  ownerlogOut,
} = require("../controllers/authController");
const isLoggedin = require("../middlewares/isLoggedin");
const user_model = require("../models/user_model");

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
  let user = await user_model.findOne({ email: req.user.email });
  res.render("ownersViewPage", {
    user: user,
    ownersProduct: ownersProduct,
  });
});
router.post("/register", ownersRegistrations);
router.post("/login", ownersLogin);
router.get("/logout", isLoggedin, ownerlogOut);
module.exports = router;
