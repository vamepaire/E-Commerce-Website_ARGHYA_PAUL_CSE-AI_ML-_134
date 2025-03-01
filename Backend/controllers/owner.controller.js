const { validationResult } = require("express-validator");
const Owner_model = require("../models/owner_model");
const OwnerService = require("../services/owner.service");
const blackListTokenSchema = require("../models/balckListToken.model");

async function OwnerRegistration(req, res) {
  try {
    const start = Date.now();

    // Validate request
    const err = validationResult(req);
    if (!err.isEmpty()) {
      console.log(err.array());
      return res.status(400).json({ errors: err.array(), message: "Arghya" });
    }

    console.log(`Validation completed in ${Date.now() - start}ms`);

    const { User_name, Shop_name, email, password, address, gstIn } = req.body;

    // Check for existing owner
    const existingOwnerStart = Date.now();
    const existingOwner = await Owner_model.findOne({
      $or: [{ email }, { gstIn }, { Shop_name }],
    });
    console.log(
      `Existing owner check completed in ${Date.now() - existingOwnerStart}ms`
    );

    if (existingOwner) {
      if (existingOwner.email === email) {
        return res
          .status(400)
          .json({ message: "Owner with this email already exists!" });
      }
      if (existingOwner.gstIn === gstIn) {
        return res
          .status(400)
          .json({ message: "Owner with this GSTIN already exists!" });
      }
      if (existingOwner.Shop_name === Shop_name) {
        return res
          .status(400)
          .json({ message: "Owner with this Shop Name already exists!" });
      }
    }

    // Hash password
    const hashStart = Date.now();
    const hashedPassword = await Owner_model.generatePassword(password);
    console.log(`Password hashing completed in ${Date.now() - hashStart}ms`);

    // Create owner
    const createOwnerStart = Date.now();
    const Owner = await OwnerService.CreateOwner({
      User_name,
      Shop_name,
      email,
      password: hashedPassword,
      address,
      gstIn,
    });
    console.log(
      `Owner creation completed in ${Date.now() - createOwnerStart}ms`
    );

    // Generate token
    const tokenStart = Date.now();
    const token = await Owner.generateToken();
    console.log(`Token generation completed in ${Date.now() - tokenStart}ms`);

    // Remove password from response
    const ownerWithoutPass = Owner.toObject();
    delete ownerWithoutPass.password;

    res.status(200).json({
      message: "Owner Created Successfully",
      owner: ownerWithoutPass,
      token,
    });

    console.log(`Total request time: ${Date.now() - start}ms`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function OwnerLogin(req, res) {
  try {
    const err = await validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    let { email, password } = req.body;
    let Owner = await Owner_model.findOne({ email: email }).select("+password");
    if (!Owner) {
      return res.status(404).json({ message: "Invalid Login" });
    }

    const isMatch = await Owner.verifyPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = await Owner.generateToken();

    res.cookie("token", token);
    req.session.owner = Owner;
    const ownerWithoutPass = Owner.toObject();
    delete ownerWithoutPass.password;
    res.status(200).json({
      message: "Owner Logged In Successfully",
      Owner: ownerWithoutPass,
      token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

async function OwnerlogOut(req, res) {
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

module.exports = { OwnerRegistration, OwnerLogin, OwnerlogOut };
