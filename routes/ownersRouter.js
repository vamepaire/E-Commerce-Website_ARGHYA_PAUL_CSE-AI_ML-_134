const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async(req, res) => {
      let owner = await ownerModel.find();
      if (owner.length > 0) {
          res.status(503).send("You don't have access to this page. Please contact admin for access")
      } else {
         let createdOwner =  await ownerModel.create({
              User_name: req.body.name,
              email: req.body.email,
              password: req.body.password,
              gstIn: req.body.gstIn,
         })
          res.status(200).send(createdOwner); 
      }
      
  });
}
router.get("/admin", (req, res) => {
  let message = req.flash("message");
  res.render("createProduct" , {message: message});
});

module.exports = router;
