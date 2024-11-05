const user_model = require("../models/user_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateTokens");
const hashPassword = require("../utils/hashPassword");

async function userRegistrations(req, res) {
  try {
    let { User_name, email, password } = req.body;
    console.log(req.body);
    
      // Check if user already exists
      let existingUser = await user_model.findOne({ email });
    if (existingUser) {
      req.flash("message", "User already exists !");
      return res.redirect("/");
        // return res.status(400).send("User already exists ! Try to Login !");
      }

    // Hash the password before saving it to the database
    password = await hashPassword(password);
    let user = await user_model.create({
      User_name,
      email,
      password,
    });
    let token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shopmate");
  } catch (err) {
    res.status(400).send({ error: err.message });
    
  }
}

async function userLogin(req, res) {
  try {
    let { email, password } = req.body;
    let user = await user_model.findOne({ email: email });
    if (!user) {
      req.flash("message", "Invalid Credentials !");
      return res.redirect("/");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("message", "Invalid Credentials !");
      return res.redirect("/");
    }
    let token = generateToken(user);
    res.cookie("token", token);
    if (token) {
      req.flash("message", "Successfully logged in !");
      return res.redirect("/shopmate");
    }
    
  }
  catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function logOut(req, res) { 
  res.clearCookie("token");
  req.flash("message", "Successfully logged out");
  res.redirect("/");
}
module.exports = { userRegistrations , userLogin , logOut};
