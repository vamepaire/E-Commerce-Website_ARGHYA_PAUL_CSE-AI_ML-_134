const express = require("express");
const router = express.Router();
const usersModel = require("../models/user_model")

router.get("/", (req, res) => {
  res.send("Hello world from User router");
});

module.exports = router;
