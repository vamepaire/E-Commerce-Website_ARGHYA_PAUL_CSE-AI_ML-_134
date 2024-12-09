const user_model = require("../models/user_model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateTokens");
const hashPassword = require("../utils/hashPassword");
const owner_model = require("../models/owner_model");

async function userRegistrations(req, res) {
  try {
    let { User_name, email, password } = req.body;

    // Validate input fields
    if (!User_name || !email || !password) {
      req.flash("message", "All fields are required.");
      return res.redirect("/registerpage");
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    if (!passwordRegex.test(password)) {
      req.flash(
        "message",
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return res.redirect("/registerpage");
    }

    // Check if user already exists
    let existingUser = await user_model.findOne({ email });
    if (existingUser) {
      req.flash("message", "User already exists! Try logging in.");
      return res.redirect("/registerpage");
    }

    // Hash the password
    password = await hashPassword(password);

    // Create new user
    let user = await user_model.create({
      User_name,
      email,
      password,
    });

    // Generate a token and set cookie
    let token = generateToken(user);
    res.cookie("token", token);

    // Flash success message and redirect
    req.flash("message", "Account created successfully.");
    res.redirect("/shopmate");
  } catch (err) {
    console.error(err); // Log the error for debugging
    req.flash("message", "Something went wrong. Please try again.");
    res.redirect("/registerpage");
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
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function logOut(req, res) {
  res.clearCookie("token");
  req.flash("message", "Successfully logged out");
  res.redirect("/");
}
async function ownersLogin(req, res) {
  try {
    let { email, password } = req.body;

    let user = await owner_model.findOne({ email: email });
    if (!user) {
      req.flash("message", "Invalid Credentials !");
      return res.redirect("/owners");
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("message", "Invalid Credentials !");
      return res.redirect("/owners");
    }
    let token = generateToken(user);
    res.cookie("token", token);
    if (token) {
      req.flash("message");
      return res.redirect("/owners/ownersPage");
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function ownersRegistrations(req, res) {
  try {
    let { User_name, email, password } = req.body;

    // Validate input fields
    if (!User_name || !email || !password) {
      req.flash("message", "All fields are required.");
      return res.redirect("/owners");
    }

    // Validate password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    if (!passwordRegex.test(password)) {
      req.flash(
        "message",
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return res.redirect("/owners");
    }

    // Check if user already exists
    let existingUser = await owner_model.findOne({ email });
    if (existingUser) {
      req.flash("message", "User already exists! Try logging in.");
      return res.redirect("/owners");
    }

    // Hash the password before saving it to the database
    password = await hashPassword(password);

    // Create new user
    let user = await owner_model.create({
      User_name,
      email,
      password,
    });

    // Generate a token and set it as a cookie
    let token = generateToken(user);
    res.cookie("token", token);

    // Flash success message and redirect
    req.flash("message", "Account created successfully.");
    res.redirect("/owners/ownersPage");
  } catch (err) {
    console.error(err); // Log the error for debugging
    req.flash("message", "Something went wrong. Please try again.");
    res.redirect("/owners");
  }
}

async function ownerlogOut(req, res) {
  res.clearCookie("token");
  req.flash("message", "Successfully logged out");
  res.redirect("/owners");
}

module.exports = {
  userRegistrations,
  userLogin,
  logOut,
  ownersLogin,
  ownersRegistrations,
  ownerlogOut,
};
