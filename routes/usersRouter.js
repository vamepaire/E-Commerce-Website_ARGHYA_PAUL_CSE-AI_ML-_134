const express = require("express");
const router = express.Router();
const {
  userRegistrations,
  userLogin,
  logOut,
} = require("../controllers/authController");
const isLoggedin = require("../middlewares/isLoggedin");

router.post("/register", userRegistrations);
router.post("/login", userLogin);
router.get("/logout", isLoggedin, logOut);
module.exports = router;
