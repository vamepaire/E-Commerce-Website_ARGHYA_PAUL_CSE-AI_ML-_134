const user_model = require("../models/user_model");
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
    req.session.user = user;
    res
      .status(200)
      .json({ message: "User Logged In Successfully", user, token });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function UserlogOut(req, res) {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    res.clearCookie("token");

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to destroy session" });
      }
      blackListTokenSchema.create({ token });
      res.status(200).json({ message: "User Logged Out Successfully", token });
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
}

module.exports = {
  userRegistrations,
  userLogin,
  UserlogOut,
};
