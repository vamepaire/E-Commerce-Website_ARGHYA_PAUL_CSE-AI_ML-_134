const express = require("express");
const router = express.Router();
const productsModel = require("../models/product_model");
const upload = require("../config/multer-config")

router.post("/create", upload.single("image"), async (req, res) => {
  
  try{let { product_name, price, discount, bgcolor, panel_color, text_color } = req.body;
  
  let product = await productsModel.create({
    product_name,
    price,
    image : req.file.buffer,
    discount,
    bgcolor,
    panel_color,
    text_color
  }) 
    req.flash("message", "Product created successfully !");
    res.redirect("/owners/admin");
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
});


module.exports = router;
