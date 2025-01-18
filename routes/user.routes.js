const express = require("express");
const router = express.Router();
const {
  userRegistrations,
  userLogin,
  UserlogOut,
} = require("../controllers/user.controller");
const {
  UserRegistrationValidator,
  UserloginValidator,
} = require("../validator/user.validator");
const UserisLoggedin = require("../middlewares/user.isLoggedin");

router.post("/register", UserRegistrationValidator, userRegistrations);
router.post("/login", UserloginValidator, userLogin);
router.get("/logout", UserisLoggedin, UserlogOut);
module.exports = router;
