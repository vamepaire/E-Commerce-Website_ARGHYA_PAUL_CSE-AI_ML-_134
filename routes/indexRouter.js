const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");


route.get("/", function (req, res) {
  let message = req.flash("message");
  console.log(message);
  
  res.render("index",{message: message});
});

route.get("/shopmate", isLoggedIn, function (req, res) {
  let message = req.flash("message");
  console.log(message);
  
  res.render("shopmate",{message: message});
});

module.exports = route;
