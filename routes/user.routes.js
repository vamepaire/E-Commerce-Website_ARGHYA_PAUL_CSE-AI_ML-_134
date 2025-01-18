const express = require("express");
const router = express.Router();
const {
  userRegistrations,
  userLogin,
  logOut,
} = require("../controllers/authController");
const {
  UserRegistrationValidator,
  UserloginValidator,
} = require("../validator/user.validator");
const isLoggedin = require("../middlewares/isLoggedin");

router.post("/register", UserRegistrationValidator, userRegistrations);
router.post("/login", UserloginValidator, userLogin);
router.get("/logout", isLoggedin, logOut);
module.exports = router;
