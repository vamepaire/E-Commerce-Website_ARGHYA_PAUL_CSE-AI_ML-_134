const express = require("express");
const router = express.Router();
const productsModel = require("../models/product_model");

router.get("/", (req, res) => {
  res.send("Hello world from Products router");
});

module.exports = router;
