const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world from User router");
});

module.exports = router;
