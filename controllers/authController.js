const user_model = require("../models/user_model");
const owner_model = require("../models/owner_model");
const { validationResult } = require("express-validator");
const UserService = require("../services/user.service");
const blackListTokenSchema = require("../models/balckListToken.model");

async function userRegistrations(req, res) {
  try {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    let { User_name, email, password } = req.body;

    let existingUser = await user_model.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User Already Exists" });
    }
    const hashedPassword = await user_model.generatePassword(password);

    const user = await UserService.CreateUser({
      User_name,
      email,
      password: hashedPassword,
    });

    const token = await user.generateToken();
    const UserWithoutPass = user.toObject();
    delete UserWithoutPass.password;
    return res.status(200).json({
      message: "User Created Successfully",
      user: UserWithoutPass,
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function userLogin(req, res) {
  try {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    let { email, password } = req.body;
    let user = await user_model.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid Login" });
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = await user.generateToken();
    res.cookie("token", token);
    res
      .status(200)
      .json({ message: "User Logged In Successfully", user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function logOut(req, res) {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  res.clearCookie("token");
  await blackListTokenSchema.create({ token });
  res.status(200).json({ message: "User Logged Out Successfully",token });
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
